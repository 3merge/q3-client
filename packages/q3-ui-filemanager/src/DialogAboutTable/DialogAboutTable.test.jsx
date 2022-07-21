import React from 'react';
import DialogAboutTable from './DialogAboutTable';

const testRenderedText = (props, testId, expectedText) =>
  expect(
    global
      .shallow(<DialogAboutTable {...props} />)
      .find({
        'data-testid': testId,
      })
      .text(),
  ).toMatch(expectedText);

test.each([
  [{}, 'type', 'N/A'],
  [{ url: 'https://images.net/test.jpg' }, 'type', 'jpg'],
  [{}, 'size', '0mbs'],
  [{ size: 10000 }, 'size', '0.01mbs'],
])('DialogAboutTable cell rendering', testRenderedText);
