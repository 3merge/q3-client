import React from 'react';
import Button from '@material-ui/core/Button';
import CollapsibleFieldLabel, {
  renderKeyboardIcon,
} from '.';

describe('CollapsibleFieldLabel', () => {
  describe('"renderKeyboardIcon"', () => {
    it('should render arrow down', () => {
      expect(
        renderKeyboardIcon(true, false).type,
      ).toHaveProperty(
        'displayName',
        'KeyboardArrowDownIcon',
      );
    });

    it('should render arrow up', () => {
      expect(
        renderKeyboardIcon(true, true).type,
      ).toHaveProperty(
        'displayName',
        'KeyboardArrowUpIcon',
      );
    });

    it('should render null', () => {
      expect(renderKeyboardIcon(false, false)).toBeNull();
    });
  });

  it('should enable click', () => {
    const p = global
      .shallow(
        <CollapsibleFieldLabel label="Foo" collapse>
          C
        </CollapsibleFieldLabel>,
      )
      .find(Button)
      .props();

    expect(p).toHaveProperty('disabled', false);
  });

  it('should disable click', () => {
    const p = global
      .shallow(
        <CollapsibleFieldLabel label="Foo" collapse={false}>
          C
        </CollapsibleFieldLabel>,
      )
      .find(Button)
      .props();

    expect(p).toHaveProperty('disabled', true);
  });
});
