import React from 'react';
import moment from 'moment';
import useActiveRequests from '../../hooks/useActiveRequests';
import UnsavedChanges, {
  withLastUpdated,
} from './UnsavedChanges';
import { Store } from '../state';

jest.mock('../../hooks/useActiveRequests', () => jest.fn());
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

    it('should not prompt confirmation if there are active requests', () => {
      useActiveRequests.mockReturnValue(true);
      mockProvider({ updatedAt: moment() });
      expect(window.confirm).not.toHaveBeenCalled();
    });

    it('should prompt confirmation if the date has expired', () => {
      useActiveRequests.mockReturnValue(false);
      mockProvider({
        updatedAt: moment().subtract(2, 'days'),
      });

      expect(window.confirm).toHaveBeenCalled();
    });
  });
});
