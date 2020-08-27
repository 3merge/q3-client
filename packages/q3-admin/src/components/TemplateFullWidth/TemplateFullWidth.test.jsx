import React from 'react';
import TemplateFullWidth from './TemplateFullWidth';

const Aside = () => (
  <div>
    <h1>Aside</h1>
    <p>Here is my aside</p>
  </div>
);

const renderTemplateFullWidth = (aside) =>
  global.mount(
    <TemplateFullWidth title="test" asideComponent={aside}>
      <div />
    </TemplateFullWidth>,
  );

describe('TemplateFullWidth', () => {
  it('should render aside when passed a component', () => {
    const wrapper = renderTemplateFullWidth(<Aside />);
    expect(wrapper.find('h1').text()).toBe('Aside');
  });

  it('should not render aside without a component', () => {
    const wrapper = renderTemplateFullWidth();
    expect(wrapper.props()).toHaveProperty(
      'asideComponent',
      null,
    );
  });
});
