import React from 'react';
import { useContextMock } from 'q3-ui-test-utils/lib/reactUtils';
import { doesNotExist } from 'q3-ui-test-utils/lib/enzymeUtils';
import SegmentListItemLinkMenuVisibility from './SegmentListItemLinkMenuVisibility';
import useSegmentsUpdate from '../useSegmentsUpdate';
import Menu from '../Menu';

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

  const el = global.shallow(
    <SegmentListItemLinkMenuVisibility
      id="test"
      items={[]}
      visibility={initialState}
    >
      {jest.fn().mockImplementation((items) => {
        const [item] = items;

        expect(item).toMatchObject({
          label: 'visibility',
          onMouseDown: expect.any(Function),
          onClick: expect.any(Function),
          nested: true,
        });

        item.onClick({
          preventDefault,
          stopPropagation,
        });

        return null;
      })}
    </SegmentListItemLinkMenuVisibility>,
  );

  el.find(Menu).props().items[0].onClick({
    preventDefault,
    stopPropagation,
  });

  el.dive();
  expect(preventDefault).toHaveBeenCalledTimes(2);
  expect(stopPropagation).toHaveBeenCalledTimes(2);
  return replaceVisibility;
};

describe('SegmentListItemLinkMenu', () => {
  it('should not render menu', () => {
    useSegmentsUpdate.mockReturnValue({});
    changeReturnValue({
      visibilityOptions: [],
    });

    doesNotExist(
      global
        .shallow(
          <SegmentListItemLinkMenuVisibility
            id="test"
            items={[]}
          >
            {jest.fn()}
          </SegmentListItemLinkMenuVisibility>,
        )
        .find(Menu),
    );
  });

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
