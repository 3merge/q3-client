import React from 'react';
import saveAs from 'file-saver';
import ColorScheme from 'color-scheme';
import * as Charts from '../../src';
import sampleSmall from '../fixtures/sample-small';

jest.mock('file-saver');
jest.unmock('useful-state');

jest.mock(
  'recharts/lib/component/ResponsiveContainer',
  () => ({
    __esModule: true,
    ResponsiveContainer: jest
      .fn()
      .mockImplementation(({ children }) => (
        <div id="responsive-container">{children}</div>
      )),
  }),
);

jest.mock('recharts/lib/chart/PieChart', () => ({
  __esModule: true,
  PieChart: jest
    .fn()
    .mockImplementation(({ children }) => (
      <div id="pie-chart">{children}</div>
    )),
}));

jest.mock('recharts/lib/polar/Pie', () => ({
  __esModule: true,
  Pie: jest
    .fn()
    .mockImplementation(({ children }) => (
      <div id="pie">{children}</div>
    )),
}));

jest.mock('recharts/lib/component/Cell', () => ({
  __esModule: true,
  Cell: jest
    .fn()
    .mockImplementation(({ children, ...rest }) => (
      <div className="cell" {...rest}>
        {children}
      </div>
    )),
}));

beforeAll(() => {
  jest
    .spyOn(ColorScheme.prototype, 'colors')
    .mockReturnValue(['000000']);
});

describe('Charts', () => {
  it('should download CSV', (done) => {
    const el = global.mount(
      <Charts.AreaLine title="samples" {...sampleSmall} />,
    );

    el.find('#chart-download-option-csv')
      .first()
      .simulate('click');

    setTimeout(() => {
      expect(saveAs).toHaveBeenCalledWith(
        expect.any(Buffer),
        'samples.csv',
      );
      done();
    }, 0);
  });

  it('should generate colours', () => {
    const el = global.mount(
      <Charts.Pie {...sampleSmall} />,
    );

    el.update();
    expect(el.find('.cell').first().props()).toHaveProperty(
      'fill',
      '#000000',
    );
  });
});
