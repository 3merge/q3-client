import React from 'react';
import Providers from 'q3-ui/lib/_helpers/providers';
import { Formik } from 'formik';
import Input, {
  DateSelect,
  DesktopSelect,
  Check,
  RadioSet,
} from 'q3-ui/lib/inputs';
import { useAuth } from 'q3-ui-permissions';
import FromJSON, { ComponentSwitcher } from '../fromJson';

jest.unmock('formik');

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn().mockReturnValue({
    isDisabled: jest.fn(),
    isDisabledPrefix: jest.fn(),
  }),
}));

describe('FromJSON', () => {
  describe('ComponentSwitcher', () => {
    it('should return a text field', () => {
      const mount = global.shallow(
        <ComponentSwitcher type="number" name="age" />,
      );

      expect(mount.find(Input).props()).toMatchObject({
        type: 'number',
        name: 'age',
      });
    });

    it('should return radio set', () => {
      const mount = global.shallow(
        <ComponentSwitcher
          type="radio"
          name="friends"
          options={[{ value: 'John', label: 'Johnny' }]}
        />,
      );

      expect(mount.find(RadioSet).props()).toMatchObject({
        name: 'friends',
        options: expect.any(Array),
      });
    });

    it('should run the options function', () => {
      const mount = global.shallow(
        <ComponentSwitcher
          type="select"
          required
          name="lang"
          options={() => [
            { value: 'en', label: 'English' },
          ]}
        />,
      );

      expect(
        mount.find(DesktopSelect).props(),
      ).toMatchObject({
        name: 'lang',
        required: true,
        options: expect.any(Array),
      });
    });

    it('should return null', () => {
      const mount = global.shallow(
        <ComponentSwitcher
          type="text"
          name="hideMe"
          conditional={['foo=bar']}
          values={{
            foo: 'quuz',
          }}
        />,
      );

      expect(mount.find(Input)).toHaveLength(0);
    });
  });

  describe('smoke', () => {
    it('should map fields to inputs', () => {
      const mount = global.mount(
        <Providers>
          <Formik>
            {() => (
              <FromJSON
                json={{
                  collectionName: 'foo',
                  createdBy: {
                    id: '123',
                  },
                  fields: {
                    name: {
                      type: 'text',
                      required: true,
                    },
                    birth: {
                      type: 'date',
                      required: true,
                    },
                    age: {
                      type: 'number',
                      required: true,
                    },
                    subscribe: {
                      type: 'checkbox',
                    },
                  },
                }}
              />
            )}
          </Formik>
        </Providers>,
      );

      expect(useAuth).toHaveBeenCalledWith('foo', '123');
      expect(mount.find(Input)).toHaveLength(2);
      expect(mount.find(DateSelect)).toHaveLength(1);
      expect(mount.find(Check)).toHaveLength(1);
    });
  });
});
