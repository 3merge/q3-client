import React from 'react';
import { act } from 'react-dom/test-utils';
import DetailSidePanel, {
  hasOneTruthyValue,
  hasMoreThanOneTruthyValue,
  isStep,
} from './DetailSidePanel';

jest.mock('@material-ui/core/Hidden', () =>
  // this component blocks mount from finding nested components
  jest.fn().mockImplementation(({ children }) => children),
);

describe('DetailSidePanel', () => {
  it('should return children without props', () => {
    const el = global.mount(
      <DetailSidePanel>
        <div id="child" />
      </DetailSidePanel>,
    );

    expect(el.find('#child').exists()).toBeTruthy();
  });

  it('should return children with tabs', () => {
    const el = global.mount(
      <DetailSidePanel documentation={<span id="docs" />}>
        <div />
      </DetailSidePanel>,
    );

    const has = (selector) =>
      expect(el.find(selector).exists()).toBeTruthy();

    act(() => {
      has('#q3-tabber');
      el.find('.q3-tabs-item').last().simulate('click');
    });

    el.update();
    has('#docs');
  });

  describe('"hasOneTruthyValue"', () => {
    it('should return truthy at least one value is truthy', () =>
      expect(
        hasOneTruthyValue({ foo: false, bar: true }),
      ).toBeTruthy());

    it('should return falsy without a truthy value', () =>
      expect(
        hasOneTruthyValue({ foo: false, bar: false }),
      ).toBeFalsy());
  });

  describe('"hasMoreThanOneTruthyValue"', () => {
    it('should return truthy if more than one is also truthy', () =>
      expect(
        hasMoreThanOneTruthyValue([true, false, true]),
      ).toBeTruthy());

    it('should return falsy if less than two is truthy', () =>
      expect(
        hasMoreThanOneTruthyValue([true, false, false]),
      ).toBeFalsy());
  });

  describe('"isStep"', () => {
    it('should return on match', () =>
      expect(isStep(1, 1, 'foo')).toMatch('foo'));

    it('should return null on mismatch', () =>
      expect(isStep(0, 1, 'foo')).toBeNull());

    it.only('should return null without third param', () =>
      expect(isStep(0, 0)).toBeNull());
  });
});
