import InitialValuesTranslator from '../InitialValuesTranslator';

describe('InitialValuesTranslator', () => {
  it('should cast all values to string', () => {
    const v = new InitialValuesTranslator({
      foo: 1,
      bar: {
        quuz: 1,
        thunk: [1, 2, 3],
      },
      thunk: [
        {
          garply: 1,
        },
      ],
    }).toString([
      ['thunk', 3],
      ['bar', 2],
    ]);

    expect(v).toMatchObject({
      foo: '1',
      'bar.quuz': '1',
      'bar.thunk': ['1', '2', '3'],
      'thunk.0.garply': '1',
    });
  });
});
