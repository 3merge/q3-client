import React from 'react';
import { getForAutocomplete, useFilters } from 'q3-ui-rest';
import SearchBar from 'q3-ui/lib/searchBar';
import Search, { FilterForm } from '../search';

jest.mock('formik', () => ({
  Formik: jest.fn(),
  Form: jest.fn(),
  connect: (v) => v,
}));

jest.mock('q3-ui-rest', () => ({
  getForAutocomplete: jest.fn(),
  useFilters: jest.fn(),
}));

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    collectionName: 'search-parents',
    resourceName: 'parents',
    resourceNameSingular: 'parent',
  });
});

describe('Search', () => {
  it('should run filter', () => {
    global.shallow(<Search fields={{ friend: 'text' }} />);
    expect(useFilters).toHaveBeenCalledWith({
      coll: 'search-parents',
      fields: ['friend'],
    });
  });

  it('should not render filter without fields', () => {
    const { filter } = global
      .shallow(<Search />)
      .find(SearchBar)
      .props();

    expect(filter()).toBeNull();
  });

  it('should call autocomplete', () => {
    const { getResults } = global
      .shallow(<Search />)
      .find(SearchBar)
      .props();

    getResults('hi');
    expect(getForAutocomplete).toHaveBeenCalledWith(
      '/search-parents?search=hi&limit=25',
      'parents',
    );
  });

  it('should assign initial values to DataLayer', () => {
    const { filter } = global
      .shallow(<Search fields={{ firstName: 'text' }} />)
      .find(SearchBar)
      .props();

    const { type, props } = filter();
    expect(type.name).toMatch('DataLayer');
    expect(props).toHaveProperty('initialValues', {
      firstName: '',
    });
  });
});

describe('FilterForm', () => {
  it('should append enum values to fields', () => {
    const tree = global.shallow(
      <FilterForm
        collectionName="foo"
        fields={{
          language: { type: 'select' },
          age: { type: 'range' },
        }}
        filters={{
          fields: {
            language: ['en', 'fr'],
          },
        }}
      />,
    );

    expect(tree.first().props().json).toHaveProperty(
      'fields',
      {
        language: {
          type: 'select',
          enum: ['en', 'fr'],
        },
        age: {
          type: 'range',
          enum: [],
        },
      },
    );
  });
});
