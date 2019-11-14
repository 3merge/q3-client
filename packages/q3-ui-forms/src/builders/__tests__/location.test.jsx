import React from 'react';
import { mount } from 'enzyme';
import { Router } from '@reach/router';
import LocationAsStateForm, {
  transformSearchParams,
  pushSearchParamsToHistory,
} from '../location';

const spy = jest.fn();
jest.unmock('formik');

beforeAll(() => {
  Object.defineProperty(window.history, 'pushState', {
    writable: true,
    value: spy,
  });
});

test('transformSearchParams should return plain object', () => {
  expect(
    transformSearchParams(
      'search=hello&categories[]=1&categories[]=2',
      {
        search: '',
        categories: [],
        age: '',
      },
    ),
  ).toMatchObject({
    search: 'hello',
    categories: ['1', '2'],
    age: '',
  });
});

test('pushSearchParamsToHistory should assign new search string', () => {
  pushSearchParamsToHistory({
    search: 'hello',
    ignore: '',
    alsoIgnore: [],
  });
  expect(spy).toHaveBeenCalledWith('', '', '?search=hello');
});

describe('LocationAsStateForm rendering', () => {
  it('should pass formikBag to searchForm component', () => {
    const Child = jest.fn().mockImplementation((Form) => Form);
    const SearchForm = () => null;

    const wrapper = mount(
      <Router>
        <LocationAsStateForm
          path="/"
          nodes={[]}
          initialValues={{ foo: '' }}
          searchForm={SearchForm}
          render={Child}
        />
      </Router>,
    );

    expect(wrapper.find(SearchForm).props()).toHaveProperty(
      'values',
    );
    expect(Child).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Array),
    );
  });
});
