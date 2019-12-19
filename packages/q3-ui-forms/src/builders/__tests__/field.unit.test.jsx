import React from 'react';
import Field from '../field';
import { ValidationChainFacade } from '../builderState';

const setField = jest.spyOn(
  ValidationChainFacade.prototype,
  'setField',
);

const effect = jest
  .spyOn(React, 'useEffect')
  .mockImplementation((v) => {
    v();
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
