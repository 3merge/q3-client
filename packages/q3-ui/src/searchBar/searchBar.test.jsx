import React from 'react';
import Fade from '@material-ui/core/Fade';
import ListItem from '@material-ui/core/ListItem';
import Graphic from '../graphic';
import SearchBar, {
  SearchResultList,
  Adornment,
  FilterTrigger,
} from '.';

import Button from '../iconButton';

describe('Searchbar', () => {
  describe('FilterTrigger', () => {
    const mountButton = (active) =>
      global
        .shallow(
          <FilterTrigger
            onClick={jest.fn()}
            active={active}
          />,
        )
        .find(Button)
        .props();

    it('should set primary on active', () => {
      const { buttonProps, icon } = mountButton(true);
      expect(buttonProps).toHaveProperty(
        'color',
        'primary',
      );
      expect(icon).toHaveProperty(
        'displayName',
        'GridOnIcon',
      );
    });

    it('should set normal on inactive', () => {
      const { buttonProps, icon } = mountButton(false);
      expect(buttonProps).toHaveProperty('color', 'normal');
      expect(icon).toHaveProperty(
        'displayName',
        'GridOffIcon',
      );
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
        <SearchResultList
          term={term}
          getResults={getResults}
        />,
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
        <SearchResultList
          term="witResults"
          getResults={getResults}
        />,
      );

      setTimeout(() => {
        expect(wrapper.find(ListItem)).toHaveLength(3);
        done();
      }, 0);
    });
  });
});

/*


describe('Seachbar', () => {
  const renderConditionally = (expanded = false) =>
    materialShallow(SearchBar, {
      expanded,
    });

  it('should render TextField conditionally', () => {
    const renderAsExpanded = (expanded, num) =>
      expect(
        renderConditionally(expanded).find(TextField),
      ).toHaveLength(num);

    renderAsExpanded(true, 1);
    renderAsExpanded(false, 0);
  });

  it('should toggle open state of Drawer', () => {
    const wrapper = renderConditionally();
    const getOpenState = () => {
      const { open } = wrapper.find(Drawer).props();
      return open;
    };

    expect(getOpenState()).toBeFalsy();
    wrapper
      .find(SearchTrigger)
      .props()
      .onOpen();
    expect(getOpenState()).toBeTruthy();
  });

  it('should control value of search fields', () => {
    const wrapper = renderConditionally(true);
    wrapper.find(TextField).simulate('change', {
      target: {
        value: '123',
      },
    });

    wrapper.update();
    const field = wrapper.find(TextField);
    expect(field.props().value).toBe('123');
  });
});
*/
