import withEditableTypography from './withEditableTypography';
import useRepeaterDecorator from '../../useRepeaterDecorator';

jest.mock('../../useRepeaterDecorator');

describe('withEditableTypography', () => {
  it('should return dashed lines without decorators', () => {
    useRepeaterDecorator.mockReturnValue(null);

    expect(
      withEditableTypography({ data: null })({
        name: 'foo',
      }),
    ).toMatch('--');
  });

  it('should return Typography if given a name resolver', () => {
    const name = jest.fn();
    useRepeaterDecorator.mockReturnValue({});
    const el = withEditableTypography({ data: null })({
      name,
    });

    expect(name).toHaveBeenCalled();
    expect(el.type.displayName).toMatch('(Typography)');
  });

  it('should return EditableTypography', () => {
    useRepeaterDecorator.mockReturnValue({
      edit: jest.fn(),
      isEditable: true,
      prefix: 'foo',
    });

    const el = withEditableTypography({
      data: { foo: 'bar' },
    })({
      name: 'foo',
      editable: {
        type: 'text',
      },
    });

    expect(el.props).toMatchObject({
      onSubmit: expect.any(Function),
      initialValues: { foo: 'bar' },
      name: 'foo',
    });
  });
});
