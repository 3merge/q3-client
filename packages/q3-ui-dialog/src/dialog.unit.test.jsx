import React from 'react';
import GamesIcon from '@material-ui/icons/Games';
import { DialogWrapper } from './index';
import DialogVariant from './variant';

const renderer = jest.fn().mockReturnValue(null);

describe('Dialog', () => {
  it('should render draggable properties/elements', () => {
    const el = global.shallow(
      <DialogWrapper
        title="foo"
        renderContent={renderer}
        renderTrigger={renderer}
        draggable
        open
      />,
    );

    expect(
      el.find(DialogVariant).prop('PaperComponent').name,
    ).toMatch('DialogDraggable');

    expect(el.find(GamesIcon).exists()).toBeTruthy();
  });

  it('should not render draggable properties/elements', () => {
    const el = global.shallow(
      <DialogWrapper
        title="foo"
        renderContent={renderer}
        renderTrigger={renderer}
        open
      />,
    );

    expect(
      el.find(DialogVariant).prop('PaperComponent').options
        .name,
    ).toBe('MuiPaper');

    expect(el.find(GamesIcon).exists()).toBeFalsy();
  });
});
