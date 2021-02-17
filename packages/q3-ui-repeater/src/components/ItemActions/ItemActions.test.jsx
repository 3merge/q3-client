import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import IconButton from 'q3-ui/lib/iconButton';
import Up from '@material-ui/icons/KeyboardArrowUp';
import ItemActions, { paginate } from './ItemActions';
import { EditorDrawer, DeleteModal } from '..';

const stub = [1, 2, 3];
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
      expect(el.props()).toHaveProperty('icon', Up);
    });

    it('should render DeleteModal and EditorDrawer', () => {
      const el = global.shallow(
        <ItemActions {...baseProps} showEditor showRemove>
          <div />
        </ItemActions>,
      );
      expect(el.find(DeleteModal).length).toBe(1);
      expect(el.find(EditorDrawer).length).toBe(1);
    });
  });

  describe('"paginate"', () => {
    it('should start over', () => {
      const fn = jest.fn();
      paginate(stub, 3, 1, fn).onNext();
      expect(fn).toHaveBeenCalledWith(1);
    });

    it('should increment', () => {
      const fn = jest.fn();
      paginate(stub, 1, 1, fn).onNext();
      expect(fn).toHaveBeenCalledWith(2);
    });

    it('should jump to end of the list', () => {
      const fn = jest.fn();
      paginate(stub, 0, 1, fn).onPrev();
      expect(fn).toHaveBeenCalledWith(2);
    });

    it('should decrease', () => {
      const fn = jest.fn();
      paginate(stub, 2, 1, fn).onPrev();
      expect(fn).toHaveBeenCalledWith(1);
    });

    it('should reset', () => {
      const fn = jest.fn();
      paginate(stub, 3, 1, fn).onExit();
      expect(fn).toHaveBeenCalledWith(1);
    });
  });
});
