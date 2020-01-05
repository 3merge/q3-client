import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '.';

const renderTrigger = jest.fn();
const renderContent = jest.fn();

describe('Dialog', () => {
  it('should pass open and close functions to its props', () => {
    global.shallow(
      <Dialog
        renderTrigger={renderTrigger}
        renderContent={renderContent}
      />,
    );

    expect(renderTrigger).toHaveBeenCalledWith(
      expect.any(Function),
    );
    expect(renderContent).toHaveBeenCalledWith(
      expect.any(Function),
    );
  });

  it('should render text components', () => {
    const el = global.shallow(
      <Dialog
        title="WithTitle"
        description="WithDescription"
        renderTrigger={renderTrigger}
        renderContent={renderContent}
      />,
    );

    expect(el.find(DialogTitle)).toHaveLength(1);
    expect(el.find(DialogContentText)).toHaveLength(1);
  });

  it('should not render text components', () => {
    const el = global.shallow(
      <Dialog
        renderTrigger={renderTrigger}
        renderContent={renderContent}
      />,
    );

    expect(el.find(DialogContentText)).toHaveLength(0);
  });
});
