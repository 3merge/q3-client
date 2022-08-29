import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import { map } from 'lodash';
import CheckListItem from '../CheckListItem';

const CheckListContainer = SortableContainer(
  ({ tasks, ...rest }) => (
    <List>
      {map(tasks, (task, index) => {
        const { id } = task;

        return (
          <CheckListItem
            {...rest}
            key={`item-${id}`}
            id={id}
            index={index}
            value={task}
          />
        );
      })}
    </List>
  ),
);

export default CheckListContainer;
