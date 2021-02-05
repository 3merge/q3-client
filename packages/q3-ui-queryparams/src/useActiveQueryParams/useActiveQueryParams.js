import { useLocation, useNavigate } from '@reach/router';
import { omit, size } from 'lodash';
import useQueryOp from '../useQueryOp';
import useQueryParams from '../useQueryParams';
import { filterBy } from '../helpers';

export const getRelevantParams = (queryObject) =>
  Object.entries(
    omit(queryObject, ['sort', 'page', 'search', 'limit']),
  );

export default () => {
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
        const makeParamShape = (args) => ({
          ...args,
          name,
        });

        const map = (label) =>
          makeParamShape({
            ...op(name, label, true),
            key: `${name}-${label}`,
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
              ...op(name, value),
              onDelete: removeFromSearchString(name, value),
              value,
            });
      })
    : [];
};
