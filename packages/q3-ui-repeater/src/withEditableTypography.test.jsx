import withEditableTypography from './withEditableTypography';
import useRepeaterDecorator from './useRepeaterDecorator';

jest.mock('./useRepeaterDecorator');

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
      editable: {
        foo: { type: 'text' },
      },
    });

    expect(el.props).toHaveProperty('isEditable', true);
    expect(el.props.fieldProps).toHaveProperty(
      'name',
      'foo',
    );
  });
});
