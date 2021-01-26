import React from 'react';
import * as Charts from 'q3-ui-charts';
import MockRestAdapter from 'q3-ui-test-utils/lib/rest';
import Location from 'q3-ui-test-utils/lib/location';
import {
  asyncMount,
  containerSpec,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import Chart from './Chart';
import data from '../../../../q3-ui-charts/tests/fixtures/sample-small';

jest.unmock('axios');
jest.unmock('useful-state');

// eslint-disable-next-line
export const TestWrapper = ({ children, delay }) => (
  <Location>
    <MockRestAdapter
      delay={delay}
      define={(m) => {
        m.onGet(/reports/).reply(200, {
          data,
        });
      }}
    >
      {children}
    </MockRestAdapter>
  </Location>
);

describe('Chart', () => {
  it('should display loading animation', async () => {
    const el = global.mount(
      <TestWrapper delay={10000}>
        <Chart
          title="Mock"
          template="foo"
          component="Bar"
        />
      </TestWrapper>,
    );

    expect(el.find(Charts.Loading).exists()).toBeTruthy();
  });

  it('should display Bar chart', async (done) => {
    // eslint-disable-next-line
    const el = await asyncMount(
      <TestWrapper delay={0}>
        <Chart
          title="Mock"
          template="foo"
          component="Bar"
        />
      </TestWrapper>,
    );

    setTimeout(() => {
      containerSpec(el).has(Charts.Bar);
      done();
    }, 10);
  });
});
