import React from 'react';
import { withLocation } from 'with-location';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export const includesNegativeCharacter = (v) =>
  typeof v === 'string' && v.includes('-');

export default (Component) =>
  withLocation((props) => {
    const { onSort, title, getFrom } = props;

    const sort = getFrom('sort');
    const isAsc = includesNegativeCharacter(sort);
    const nextValue = !sort || isAsc ? title : `-${title}`;

    const onClick = React.useCallback(
      () => (onSort ? onSort(nextValue) : null),
      [onSort],
    );

    return (
      <TableSortLabel
        id={title}
        active={sort && sort.includes(title)}
        direction={isAsc ? 'asc' : 'desc'}
        onClick={onClick}
      >
        <div style={{ textOverflow: 'ellipsis' }}>
          <Component {...props} />
        </div>
      </TableSortLabel>
    );
  });
