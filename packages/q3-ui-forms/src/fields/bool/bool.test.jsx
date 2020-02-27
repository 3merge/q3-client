import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Bool, { ExpandedBoolLabel, getBoolVariant } from '.';

describe('Bool', () => {
  describe('"getBoolVariant"', () => {
    it('should match variant to component', () => {
      expect(getBoolVariant()).toMatchObject(Checkbox);
      expect(getBoolVariant('radio')).toMatchObject(Radio);
      expect(getBoolVariant('switch')).toMatchObject(
        Switch,
      );
    });
  });

  describe('"Component"', () => {
    it('should append sizing attr', () => {
      const el = global
        .shallow(
          <Bool
            label="hello"
            vars={{ opts: 1 }}
            onChange={jest.fn()}
            variant="switch"
          />,
        )
        .find(FormControlLabel)
        .props();

      expect(el).toHaveProperty('size', 'small');
    });
  });

  describe('"ExpandedBoolLabel"', () => {
    const getLabel = (props, expectedLen) => {
      const el = global
        .shallow(<ExpandedBoolLabel {...props} />)
        .find('strong');

      return expect(el).toHaveLength(expectedLen);
    };

    it('should render label strongly', () => {
      getLabel({ label: 'Foo', helperText: 'bar' }, 1);
    });

    it('should render label plainly', () => {
      getLabel({ label: 'Foo' }, 0);
    });
  });
});
