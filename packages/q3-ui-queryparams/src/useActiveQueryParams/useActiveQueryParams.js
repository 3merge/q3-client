import { useLocation, useNavigate } from '@reach/router';
import { omit, size, get } from 'lodash';
import useQueryOp from '../useQueryOp';
import useQueryParams from '../useQueryParams';
import { filterBy } from '../helpers';

export const getRelevantParams = (queryObject) =>
  Object.entries(
    omit(queryObject, ['sort', 'page', 'search', 'limit']),
  );

export default (iconMap = {}) => {
  const op = useQueryOp();
  const qp = useQueryParams();
  const navigate = useNavigate();
  const search = qp.decode(useLocation()?.search);
  const params = getRelevantParams(search);

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
        [name]: filterBy(values, valueToOmit),
      }),
    );

  return size(params)
    ? params.flatMap(([name, value]) => {
        const icon = get(iconMap, name);
        const makeParamShape = (args) => ({
          ...args,
          icon,
          name,
        });

        const map = (label) =>
          makeParamShape({
            key: `${name}-${label}`,
            label: op(name, label, true),
            onDelete: modifyInSearchString(
              name,
              label,
              value,
            ),
            value: label,
          });

        return Array.isArray(value)
          ? value.map(map)
          : makeParamShape({
              key: name,
              onDelete: removeFromSearchString(name, value),
              label: op(name, value),
              value,
            });
      })
    : [];
};
