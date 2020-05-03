import React from 'react';
import useRepeaterDecorator, {
  RepeaterDecorator,
} from './useRepeaterDecorator';

let context;

const mockAuth = (canEditSubResp) => ({
  edit: jest.fn(),
  auth: {
    canEditSub: jest.fn().mockReturnValue(canEditSubResp),
  },
});

beforeEach(() => {
  context = jest.spyOn(React, 'useContext');
});

describe('useRepeaterDecorator', () => {
  describe('hook', () => {
    it('should return null', () => {
      context.mockReturnValue({
        auth: {
          canSeeSub: jest.fn().mockReturnValue(false),
        },
      });

      expect(useRepeaterDecorator()).toBeNull();
    });

    it('should return decorators', () => {
      context.mockReturnValue({
        auth: {
          canSeeSub: jest.fn().mockReturnValue(true),
        },
      });

      expect(useRepeaterDecorator()).toHaveProperty(
        'prefix',
      );
    });
  });

  describe('RepeaterDecorator', () => {
    it('should return dot notation', () => {
      const { prefix } = RepeaterDecorator(
        { name: 'foo' },
        { name: 'bar' },
      );
      expect(prefix).toMatch('foo.bar');
    });

    it('should return option name', () => {
      const { prefix } = RepeaterDecorator(
        {},
        { name: 'bar' },
      );
      expect(prefix).toMatch('bar');
    });

    it('should return as editable', () => {
      const { isEditable } = RepeaterDecorator(
        mockAuth(true),
        {
          name: 'bar',
          editable: { bar: { type: 'text' } },
        },
      );
      expect(isEditable).toBeTruthy();
    });

    it('should return as non-editable with authorization', () => {
      const { isEditable } = RepeaterDecorator(
        mockAuth(false),
        {
          name: 'bar',
          editable: { bar: { type: 'text' } },
        },
      );
      expect(isEditable).toBeFalsy();
    });

    it('should return as non-editable with editable props', () => {
      const { isEditable } = RepeaterDecorator(
        mockAuth(true),
        {},
      );
      expect(isEditable).toBeFalsy();
    });
  });
});
