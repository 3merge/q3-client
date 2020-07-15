import React from 'react';
import { act } from 'react-dom/test-utils';
import CircularProgress from '@material-ui/core/CircularProgress';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import Chart from './Chart';
import ChartFixture from './Chart.fixture.jsx';

jest.unmock('axios');

const waitForMock = (next) =>
  act(async () => {
    await new Promise((r) =>
      setTimeout(() => {
        next();

        // allow mock adapter to complete
        // it rests for 200 ms
        r();
      }, 210),
    );
  });

describe('Chart', () => {
  it('should render loading indicator', async () => {
    const el = global.mount(
      <ChartFixture>
        <Chart
          title="Mock"
          // unknown report
          initialQueryValue="?template=bar"
          chartComponent={<div />}
          filterComponent={<div />}
        />
      </ChartFixture>,
    );

    const getCircularProgress = (expectedLength) =>
      expect(el.find(CircularProgress)).toHaveLength(
        expectedLength,
      );

    getCircularProgress(1);

    return waitForMock(() => {
      el.update();
      getCircularProgress(0);
      expect(el.find(BrokenImageIcon)).toHaveLength(1);
    });
  });

  it('should pass data into the chartComponent property', async () => {
    const Child = () => <div />;
    const el = global.mount(
      <ChartFixture>
        <Chart
          title="Mock"
          initialQueryValue="?template=foo"
          chartComponent={<Child />}
          filterComponent={<div />}
        />
      </ChartFixture>,
    );

    return waitForMock(() => {
      el.update();
      const { data = [] } = el.find(Child).first().props();
      expect(data).toHaveLength(2);
    });
  });
});
