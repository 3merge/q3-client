import React from 'react';
import { act } from 'react-dom/test-utils';
import Chart from './Chart';

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

const genChild = () => {
  const Child = () => <div />;

  return {
    el: Child,
    getProps: (el) => el.find(Child).first().props(),
  };
};

describe('Chart', () => {
  it('should render loading indicator', async () => {
    const { el: Child, getProps } = genChild();
    const el = global.mount(
      <Chart
        title="Mock"
        initialQueryValue="?template=foo"
        chartComponent={<Child />}
        filterComponent={<div />}
      />,
    );

    const getCircularProgress = (expectedResult) =>
      expect(getProps(el)).toHaveProperty(
        'loading',
        expectedResult,
      );

    getCircularProgress(true);

    return waitForMock(() => {
      el.update();
      getCircularProgress(false);
    });
  });

  it('should pass data into the chartComponent property', async () => {
    const Child = () => <div />;
    const el = global.mount(
      <Chart
        title="Mock"
        initialQueryValue="?template=foo"
        chartComponent={<Child />}
        filterComponent={<div />}
      />,
    );

    return waitForMock(() => {
      el.update();
      const { data = [] } = el.find(Child).first().props();
      expect(data).toHaveLength(2);
    });
  });
});
