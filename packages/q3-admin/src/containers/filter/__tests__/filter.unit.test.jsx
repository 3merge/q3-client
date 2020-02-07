import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FilterWrapper from 'q3-ui-filters';
import Filter from '..';
import useFilterAndContext from '../useFilterAndContext';

jest.mock('../useFilterAndContext');

const Mock = () => null;

describe('Filter container', () => {
  it('should render loading icon', () => {
    useFilterAndContext.mockReturnValue({ loading: true });
    const el = global
      .shallow(
        <Filter>
          <Mock />
        </Filter>,
      )
      .find(CircularProgress);
    expect(el).toHaveLength(1);
  });

  it('should render filter with options', () => {
    useFilterAndContext.mockReturnValue({
      loading: false,
      fields: { foo: [1] },
    });
    const el = global.shallow(
      <Filter>
        <Mock type="chips" name="foo" />
      </Filter>,
    );
    expect(el.find(FilterWrapper)).toHaveLength(1);
    expect(el.find(Mock).props()).toHaveProperty(
      'options',
      ['1'],
    );
  });
});
