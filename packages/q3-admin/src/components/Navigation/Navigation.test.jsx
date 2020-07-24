import React from 'react';
import TreeItem from '@material-ui/lab/TreeItem';
import Navigation, { isPartialMatch } from './Navigation';

jest.mock('@material-ui/core/Hidden', () =>
  // this component blocks mount from finding nested components
  jest.fn().mockImplementation(({ children }) => children),
);

const genLinkItem = (props) => ({
  label: 'Test',
  visible: true,
  to: '/',
  ...props,
});

const countLinks = (menuItems, expectedOutput) => {
  const el = global.mount(
    <Navigation menuItems={menuItems} />,
  );

  return expect(el.find(TreeItem)).toHaveLength(
    expectedOutput,
  );
};

describe('"Admin>isPartialMatch"', () => {
  it('should match without leading', () =>
    expect(isPartialMatch('/foo', 'foo')).toBeTruthy());

  it('should match parent directory', () =>
    expect(isPartialMatch('/app/foo', 'foo')).toBeTruthy());

  it('should match subdirectories', () =>
    expect(
      isPartialMatch('/foo', '/foo/123'),
    ).toBeTruthy());

  it('should not match', () =>
    expect(isPartialMatch('/foo', 'bar')).toBeFalsy());
});

describe('Navigation', () => {
  it('should render a link when visible', () =>
    countLinks([genLinkItem()], 1));

  it('should render a link when it contains visible items', () =>
    countLinks(
      [
        {
          label: 'Nested',
          nestedMenuItems: [genLinkItem({ visible: true })],
        },
      ],
      2,
    ));

  it('should not render a link without visible items', () =>
    countLinks(
      [
        genLinkItem({
          to: undefined,
          nestedMenuItems: [
            genLinkItem({ visible: false }),
          ],
        }),
      ],
      0,
    ));
});
