import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { includes } from 'lodash';

export const includesNegativeCharacter = (v) =>
  typeof v === 'string' && v.includes('-');

export const getSortDirection = (currentSort, nextSort) => {
  if (includes(currentSort, nextSort))
    return includesNegativeCharacter(currentSort)
      ? {
          active: true,
          direction: 'asc',
          value: nextSort,
        }
      : {
          active: true,
          direction: 'desc',
          value: `-${nextSort}`,
        };

  return {
    active: false,
    direction: 'desc',
    value: nextSort,
  };
};

export default (Component) => (props) => {
  // eslint-disable-next-line
  const { onSort, title, sort } = props;
  const { active, direction, value } = getSortDirection(
    sort,
    title,
  );

  const onClick = React.useCallback(
    () => (onSort ? onSort(value) : null),
    [value, onSort],
  );

  return (
    <TableSortLabel
      id={title}
      active={active}
      direction={direction}
      onClick={onClick}
    >
      <div style={{ textOverflow: 'ellipsis' }}>
        <Component {...props} />
      </div>
    </TableSortLabel>
  );
};
