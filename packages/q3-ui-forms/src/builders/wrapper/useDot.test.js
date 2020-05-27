import useDot from './useDot';

describe('useDot', () => {
  it('should run translate and keeper', () => {
    const { initialValues } = useDot(
      {
        keep: ['foo', 'quuz'],
        translate: {
          quuz: 'quuz.quux',
        },
        modify: {
          'quuz': [(v) => v * 10],
        },
      },
      {
        foo: 1,
        bar: 1,
        quuz: {
          quux: 1,
        },
      },
    );

    expect(initialValues).not.toHaveProperty('bar');
    expect(initialValues).toMatchObject({
      foo: 1,
      quuz: 10,
    });
  });

  it('should run marshal and drop', () => {
    const handleSubmit = jest.fn();
    const { onSubmit } = useDot({
      onSubmit: handleSubmit,
      marshal: {
        bar: 'bar',
        'quuz.ref': 'quuz.quux',
      },
    });

    onSubmit(
      {
        foo: 1,
        bar: 1,
        quuz: {
          quux: 1,
        },
      },
      null,
    );

    expect(handleSubmit).toHaveBeenCalledWith(
      {
        bar: 1,
        quuz: {
          ref: 1,
        },
      },
      null,
    );
  });

  it('should run marshal and drop', () => {
    const handleSubmit = jest.fn();
    const { onSubmit } = useDot({
      onSubmit: handleSubmit,
      marshalSelectively: true,
      marshal: {
        bar: 'bar',
        'quuz.ref': 'quuz.quux',
      },
    });

    onSubmit(
      {
        foo: 1,
        bar: 1,
        quuz: {
          quux: 1,
        },
      },
      null,
    );

    expect(handleSubmit).toHaveBeenCalledWith(
      {
        foo: 1,
        bar: 1,
        quuz: {
          quux: 1,
          ref: 1,
        },
      },
      null,
    );
  });
});
