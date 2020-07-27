import React from 'react';
import moment from 'moment';
import UnsavedChanges, {
  withLastUpdated,
} from './UnsavedChanges';
import { Store } from '../state';

jest.mock('../../hooks/useSocket', () =>
  jest.fn().mockReturnValue(
    // this is the date returned from socket
    // it would represent the real-time timestamp
    new Date(),
  ),
);

beforeEach(() => {
  window.confirm = jest.fn();
});

describe('Admin>UnsavedChanges', () => {
  describe('"withLastUpdated"', () => {
    it('should provide comparison function', () => {
      const Child = () => {
        return <div />;
      };

      const Wrapped = withLastUpdated(Child);
      const rendererd = global.mount(<Wrapped />);
      const props = rendererd.find(Child).props();

      expect(props).toHaveProperty('lastUpdated');

      expect(
        props.hasExpired(moment().subtract(2, 'days')),
      ).toBeTruthy();
    });
  });

  describe('"default"', () => {
    const mockProvider = (updatedAt) =>
      global.mount(
        <Store.Provider
          value={{
            data: { updatedAt },
          }}
        >
          <UnsavedChanges />
        </Store.Provider>,
      );

    it('should prompt confirmation if the date has expired', () => {
      mockProvider({
        updatedAt: moment().subtract(2, 'days'),
      });

      expect(window.confirm).toHaveBeenCalled();
    });
  });
});
