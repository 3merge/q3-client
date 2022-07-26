import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import withDrag from './withDrag';

jest.mock('react-dnd', () => ({
  useDrag: jest.fn().mockReturnValue([]),
}));

jest.mock('../useDropEnd');
jest.mock('../useDragPreviewDisable');

const triggerClickAway = (
  shouldContain,
  overwriteContext,
) => {
  const context = {
    deselect: jest.fn(),
    disabled: false,
    ...overwriteContext,
  };

  jest.spyOn(React, 'useContext').mockReturnValue(context);
  jest
    .spyOn(Node.prototype, 'contains')
    .mockReturnValue(shouldContain);

  const Component = withDrag(
    // eslint-disable-next-line
    React.forwardRef((props, ref) => (
      <div id="outer">
        <div className="q3-file">
          <span id="inner" />
        </div>
      </div>
    )),
  );

  global
    .mount(<Component id="1" />)
    .find(ClickAwayListener)
    .props()
    .onClickAway({
      target: null,
    });

  return context;
};

describe('withDrag', () => {
  it('should not deselect when contained', () => {
    const context = triggerClickAway(true);
    expect(context.deselect).not.toHaveBeenCalled();
  });

  it('should deselect when outside a recognize class', () => {
    const context = triggerClickAway(false, {
      disabled: true,
    });

    expect(context.deselect).not.toHaveBeenCalled();
  });

  it('should deselect', () => {
    const context = triggerClickAway(false, {
      disabled: false,
    });

    expect(context.deselect).toHaveBeenCalled();
  });
});
