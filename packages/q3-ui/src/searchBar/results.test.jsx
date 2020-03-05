import React from 'react';
import Results, {
  SearchResultListItem,
  asLink,
  hasResults,
  withRenderer,
  withHighlighter,
} from './results';

describe('SearchResults', () => {
  describe('"hasResults"', () => {
    it('should return truthy with results and search term', () => {
      expect(hasResults([1], 'Defined')).toBeTruthy();
    });

    it('should return truthy without results or a search term', () => {
      expect(hasResults([1], '')).toBeFalsy();
      expect(hasResults([], 'Defined')).toBeFalsy();
    });
  });

  describe('"asLink"', () => {
    it('should render an empty object', () => {
      expect(asLink()).toEqual({});
    });

    it('should render link props', () => {
      expect(asLink('foo')).toMatchObject({
        button: true,
        component: expect.any(Object),
        to: 'foo',
      });
    });
  });

  describe('"withRenderer"', () => {
    it('should return null', () => {
      expect(withRenderer(undefined, 1)).toBeNull();
      expect(withRenderer('', 1)).toBeNull();
      expect(withRenderer(null, 1)).toBeNull();
    });

    it('should return second param', () => {
      expect(withRenderer(1, 1)).toBe(1);
    });
  });

  describe('"withHighlighter"', () => {
    it('should add searchWords', () => {
      const El = withHighlighter('Hello World');
      const props = global
        .shallow(<El target="foo" />)
        .props();
      expect(props).toHaveProperty('searchWords', [
        'Hello',
        'World',
      ]);
    });
  });

  describe('SearchResultList', () => {
    it('should call getResults promise with term', (done) => {
      const term = 'hi';
      const spy = jest
        .spyOn(React, 'useEffect')
        .mockImplementationOnce((f) => f());

      const getResults = jest.fn().mockImplementation(
        (v) =>
          new Promise((resolve) => {
            expect(v).toMatch(term);
            expect(spy).toHaveBeenCalledWith(
              expect.any(Function),
              [term],
            );
            resolve([]);
            done();
          }),
      );

      global.shallow(
        <Results term={term} getResults={getResults} />,
      );
    });

    it('should render a list without results', (done) => {
      jest
        .spyOn(React, 'useEffect')
        .mockImplementationOnce((f) => f());

      const getResults = jest.fn().mockImplementation(() =>
        Promise.resolve([
          {
            id: 1,
            name: 'foo',
            description: 'bar',
            url: '/quux',
          },
          {
            id: 2,
            name: 'foo',
            description: 'bar',
            url: '/quux',
          },
          {
            id: 3,
            name: 'foo',
            description: 'bar',
            url: '/quux',
          },
        ]),
      );

      const wrapper = global.shallow(
        <Results
          term="witResults"
          getResults={getResults}
        />,
      );

      setTimeout(() => {
        expect(
          wrapper.find(SearchResultListItem),
        ).toHaveLength(3);
        done();
      }, 0);
    });
  });
});
