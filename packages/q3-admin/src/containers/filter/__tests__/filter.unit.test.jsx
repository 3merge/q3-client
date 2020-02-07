import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FilterWrapper from 'q3-ui-filters';
import { FormWrapper } from '..';
import useFilterAndContext from '../useFilterAndContext';

jest.mock('../useFilterAndContext');

const Mock = () => null;
const getProps = () => ({
  id: 's',
  pushTo: jest.fn(),
  getAll: jest.fn(),
  getFrom: jest.fn(),
  params: {
    toString: jest.fn(),
  },
});

describe('Filter container', () => {
  it('should render loading icon', () => {
    useFilterAndContext.mockReturnValue({ loading: true });
    const el = global
      .shallow(
        <FormWrapper {...getProps()}>
          <Mock />
        </FormWrapper>,
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
      <FormWrapper {...getProps()}>
        <Mock type="chips" name="foo" />
      </FormWrapper>,
    );

    expect(el.find(FilterWrapper)).toHaveLength(1);
    expect(el.find(Mock).props()).toHaveProperty(
      'options',
      [1],
    );
  });
});
