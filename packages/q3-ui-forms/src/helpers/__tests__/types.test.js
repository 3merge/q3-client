import { getForTransfer } from 'q3-ui-rest';
import FieldBuilder from '../types';

jest.unmock('formik');

jest.mock('q3-ui-rest', () => ({
  getForTransfer: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn().mockReturnValue({
    isDisabled: jest.fn(),
    isDisabledPrefix: jest.fn(),
  }),
}));

describe('FromJSON', () => {
  describe('FieldBuilder', () => {
    it('should set valid HTML types', () => {
      expect(new FieldBuilder('url').type).toBe('url');
      expect(new FieldBuilder('tel').type).toBe('tel');
      expect(new FieldBuilder('unknown').type).toBeNull();
    });

    it('should return null', () => {
      expect(
        new FieldBuilder(
          'url',
          { conditional: ['foo=bar'] },
          { foo: 'quux' },
        ).build(),
      ).toBeNull();
    });

    it('should set options props', () => {
      const options = jest.fn().mockReturnValue('ok');
      expect(
        new FieldBuilder(
          'url',
          { options },
          { foo: 'bar' },
        ).build(),
      ).toMatchObject({
        options: 'ok',
      });
      expect(options).toHaveBeenCalledWith({ foo: 'bar' });
    });

    it('should set loadOptions props', () => {
      expect(
        new FieldBuilder('url', {
          loadOptions: {
            url: '/',
            key: 'foo',
            field: 'name',
          },
        }).build(),
      ).toMatchObject({
        loadOptions: expect.any(Function),
      });

      expect(getForTransfer).toHaveBeenCalledWith(
        '/',
        'foo',
        'name',
      );
    });
  });
});
