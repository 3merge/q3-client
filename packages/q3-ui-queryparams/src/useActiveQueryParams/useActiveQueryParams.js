import { useLocation, useNavigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { omit, size, get } from 'lodash';
import { parseOp, formatter } from '../helpers';
import useQueryParams from '../useQueryParams';

export default (iconMap = {}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const qp = useQueryParams();
  const search = qp.decode(useLocation()?.search);

  const params = Object.entries(
    omit(search, ['sort', 'page', 'search', 'limit']),
    '=',
  );

  const removeFromSearchString = (name) => () =>
    navigate(qp.encode(omit(search, [name])));

  const modifyInSearchString = (
    name,
    valueToOmit,
    values,
  ) => () =>
    navigate(
      qp.encode({
        ...search,
        [name]: values.filter((v) => v !== valueToOmit),
      }),
    );

  const getChipLabel = (name, value, isArray = false) =>
    t(`labels:${parseOp(name, isArray ? 'in' : value)}`, {
      key: t(`labels:${formatter(name).key}`),
      value: t(`filters:${formatter(value).value}`),
    });

  if (!size(params)) return [];

  return params.flatMap(([name, value]) => {
    const icon = get(iconMap, name);

    const map = (label) => ({
      key: `${name}-${label}`,
      icon,
      name,
      label: getChipLabel(name, label, true),
      onDelete: modifyInSearchString(name, label, value),
      value: label,
    });

    return Array.isArray(value)
      ? value.map(map)
      : {
          key: name,
          name,
          onDelete: removeFromSearchString(name, value),
          label: getChipLabel(name, value),
          icon,
          value,
        };
  });
};
