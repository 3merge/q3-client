import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Up from '@material-ui/icons/KeyboardArrowUp';
import ItemActions from './ItemActions';
import { DeleteModal } from '..';
import ItemActionsWrapper from '../ItemActionsWrapper';

const baseProps = {
  parent: [{ id: '1' }],
  index: 0,
  currentIndex: 0,
  toggleNested: jest.fn(),
  setCurrentIndex: jest.fn(),
};

describe('ItemActions', () => {
  describe('"ItemActions"', () => {
    it('should return without children', () => {
      const el = global
        .shallow(
          <ItemActions
            {...baseProps}
            showEditor={false}
            showRemove={false}
            nestedIsVisible={false}
          >
            <div />
          </ItemActions>,
        )
        .find(TableCell)
        .children().length;
      expect(el).toBe(0);
    });

    it('should render IconButton toggle', () => {
      const el = global
        .shallow(
          <ItemActions
            {...baseProps}
            showEditor={false}
            showRemove={false}
            renderNestedTableRow={jest.fn()}
            nestedIsVisible
          >
            <div />
          </ItemActions>,
        )
        .find(IconButton);
      expect(el).toHaveLength(1);
      expect(el.find(Up).exists()).toBeTruthy();
    });

    it('should render DeleteModal and EditorDrawer', () => {
      const el = global.shallow(
        <ItemActions {...baseProps} showEditor showRemove>
          <div />
        </ItemActions>,
      );
      expect(el.find(DeleteModal).length).toBe(1);
      expect(el.find(ItemActionsWrapper).length).toBe(1);
    });
  });
});
