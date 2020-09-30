import { castToSimpleArray } from 'q3-ui-forms/lib/helpers';
import useDot from '../useDot';

console.log(castToSimpleArray);

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
      foo: '1',
      quuz: '10',
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

    onSubmit({
      foo: 1,
      bar: 1,
      quuz: {
        quux: 1,
      },
    });

    expect(handleSubmit).toHaveBeenCalledWith({
      bar: 1,
      quuz: {
        ref: 1,
      },
    });
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

    onSubmit({
      foo: 1,
      bar: 1,
      quuz: {
        quux: 1,
      },
    });

    expect(handleSubmit).toHaveBeenCalledWith({
      foo: 1,
      bar: 1,
      quuz: {
        quux: 1,
        ref: 1,
      },
    });
  });

  const original = {
    bio: 'Testing!',
    firstName: 'Gregory Alan',
    skills: ['C++', 'CSS', { label: 'CSS', value: 'CSS' }],
  };

  const newValue = {
    skills: ['C++', 'CSS'],
  };

  it.only('should replace if array type', () => {
    const { executeMarshal } = useDot({
      marshalSelectively: true,
      marshal: { skills: [castToSimpleArray] },
    });
    const result = executeMarshal()(original);
    console.log(result);

    expect(result).toEqual({
      bio: 'Testing!',
      firstName: 'new first name',
      skills: ['C++', 'CSS'],
    });
  });
});
