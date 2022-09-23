import React from 'react';
import { useContextMock } from 'q3-ui-test-utils/lib/reactUtils';
import SegmentListItemLinkMenuVisibility from './SegmentListItemLinkMenuVisibility';
import useSegmentsUpdate from '../useSegmentsUpdate';

jest.mock('../useSegmentsUpdate');

const { changeReturnValue } = useContextMock();

const testFirstVisibilityItem = (initialState) => {
  const replaceVisibility = jest.fn();
  const preventDefault = jest.fn();
  const stopPropagation = jest.fn();

  changeReturnValue({
    visibilityOptions: ['Admin', 'Sales', 'Support'],
  });

  useSegmentsUpdate.mockReturnValue({
    replaceVisibility,
  });

  global.shallow(
    <SegmentListItemLinkMenuVisibility
      id="test"
      items={[]}
      visibility={initialState}
    >
      {jest.fn().mockImplementation((items) => {
        const [, item] = items;
        item.onClick({
          preventDefault,
          stopPropagation,
        });

        expect(preventDefault).toHaveBeenCalled();
        expect(stopPropagation).toHaveBeenCalled();
        return null;
      })}
    </SegmentListItemLinkMenuVisibility>,
  );

  return replaceVisibility;
};

describe('SegmentListItemLinkMenu', () => {
  it('should set', () => {
    expect(
      testFirstVisibilityItem([]),
    ).toHaveBeenCalledWith('test', ['Admin']);
  });

  it('should set', () => {
    expect(testFirstVisibilityItem()).toHaveBeenCalledWith(
      'test',
      ['Admin'],
    );
  });

  it('should remove', () => {
    expect(
      testFirstVisibilityItem(['Admin', 'Sales']),
    ).toHaveBeenCalledWith('test', ['Sales']);
  });

  it('should add', () => {
    expect(
      testFirstVisibilityItem(['Sales']),
    ).toHaveBeenCalledWith('test', ['Sales', 'Admin']);
  });
});
