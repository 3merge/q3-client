import React from 'react';
import withHeader from './withHeader';

const Component = withHeader((props) =>
  React.createElement('div', props),
);

const getAxisLength = (el) => el.find('[data-role="axis"]');

const getContainerMarginValue = (el) =>
  el.find('.q3-charts-axis-container').prop('ml');

describe('withHeader', () => {
  it('should render axis', () => {
    const el = global.shallow(
      <Component
        title="test"
        yAxisTitle="y axis title"
        xAxisTitle="x axis title"
      >
        <div />
      </Component>,
    );

    expect(getAxisLength(el)).toHaveLength(2);
    expect(getContainerMarginValue(el)).toBe(2);
  });

  it('should not render axis', () => {
    const el = global.shallow(
      <Component title="test">
        <div />
      </Component>,
    );

    expect(getAxisLength(el)).toHaveLength(0);
    expect(getContainerMarginValue(el)).toBe(0);
  });
});
