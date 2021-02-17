import React from 'react';
import Attributes from './Attribute';

describe('"Attributes"', () => {
  it('should return custom rendered components', () => {
    const Comp = () => <div />;

    const el = global
      .shallow(
        <Attributes
          show
          attributes={['Foo', 'Bar']}
          isIn={jest.fn()}
          component={Comp}
        />,
      )
      .find(Comp);

    expect(el).toHaveLength(2);
  });

  it('should return nullish on show false', () => {
    const el = global.shallow(<Attributes show={false} />);

    expect(el).toEqual({});
  });
});
