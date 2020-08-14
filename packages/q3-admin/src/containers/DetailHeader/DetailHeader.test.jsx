import React from 'react';
import { DetailHeaderBackComponent } from './DetailHeader';
import FeaturedPhoto from '../FeaturedPhoto';
import { useAppContext } from '../../hooks';

let useContext;

jest.mock('../../hooks/useAppContext', () => jest.fn());

beforeEach(() => {
  useContext = jest.spyOn(React, 'useContext');
});

describe('DetailHeader', () => {
  describe('"DetailHeaderBackComponent"', () => {
    it('should render FeaturedPhoto', () => {
      const fn = jest.fn();

      useAppContext.mockReturnValue({
        can: jest.fn().mockReturnValue('true'),
      });

      useContext.mockReturnValue({
        patch: jest.fn().mockReturnValue(fn),
        data: {},
      });

      expect(
        global
          .shallow(<DetailHeaderBackComponent />)
          .find(FeaturedPhoto),
      ).toHaveLength(1);
    });
  });
});
