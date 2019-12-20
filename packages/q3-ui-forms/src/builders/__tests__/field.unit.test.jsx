import React from 'react';
import Field from '../field';

const setField = jest.fn();

const effect = jest
  .spyOn(React, 'useEffect')
  .mockImplementationOnce((v) => v())
  .mockImplementationOnce((v) => v())
  .mockReturnValue(null);

jest.spyOn(React, 'useContext').mockReturnValue({
  validation: { setField },
  authorization: {
    checkReadAuthorizationContext: jest.fn(),
    checkEditAuthorizationContext: jest.fn(),
  },
});

describe('Field', () => {
  describe('useEffect', () => {
    it('should send validation chain to context', () => {
      global.shallow(
        <Field name="foo" type="text" required />,
      );

      expect(effect).toHaveBeenCalled();
      expect(setField).toHaveBeenCalledWith('foo', {
        type: 'text',
        required: true,
      });
    });
  });

  describe('useAuth', () => {
    it.todo('should pass along authentication');
    it.todo('should hide the field');
    it.todo('should mark the field as readonly/disabled');
  });
});
