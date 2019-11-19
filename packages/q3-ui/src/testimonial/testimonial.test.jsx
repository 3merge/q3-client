import React from 'react';
import Testimonial from '.';

test('It should render a blockquote and citation', () => {
  const wrapper = global.mount(
    <Testimonial
      quote="Foo"
      person="Bar"
      position="Quux"
    />,
  );

  expect(wrapper.find('blockquote')).toHaveLength(1);
  expect(wrapper.find('cite')).toHaveLength(1);
});
