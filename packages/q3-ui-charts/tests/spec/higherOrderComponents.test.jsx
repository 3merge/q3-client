import React from 'react';
import saveAs from 'file-saver';
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

describe('Charts', () => {
  it('should download CSV', (done) => {
    const el = global.mount(
      <Charts.Line title="samples" {...sampleSmall} />,
    );

    el.find('#chart-download-option-csv')
      .first()
      .simulate('click');

    setTimeout(() => {
      expect(saveAs).toHaveBeenCalledWith(
        expect.any(Blob),
        'samples.csv',
      );
      done();
    }, 0);
  });
});
