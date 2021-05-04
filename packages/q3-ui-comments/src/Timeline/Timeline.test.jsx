import React from 'react';
import moment from 'moment';
import { AuthContext } from 'q3-ui-permissions';
import Confirm from 'q3-ui-confirm';
import Timeline from './Timeline';
import TimelineEntry from '../TimelineEntry';
import d from '../../tests/fixtures/data';
import Dialog from '../Dialog';

const makeIsoString = (offset) =>
  moment().subtract(offset, 'day').toISOString();

const { createdBy } = d[0];

const services = {
  patch: jest.fn(),
  post: jest.fn(),
  remove: jest.fn(),
  id: '1',
  collectionName: 'test',
};

const data = [
  {
    id: '3',
    createdAt: makeIsoString(3),
    createdBy,
  },
  {
    id: '2',
    createdAt: makeIsoString(2),
    createdBy,
  },
  {
    id: '1',
    createdAt: makeIsoString(4),
    createdBy,
  },
];

const getFirstTimelineEntry = (asc) =>
  global
    .mount(<Timeline {...services} asc={asc} data={data} />)
    .find(TimelineEntry)
    .first()
    .prop('id');

describe('Timeline', () => {
  it('should render by date ASC', () => {
    expect(getFirstTimelineEntry(true)).toMatch('2');
  });

  it('should render by date DESC', () => {
    expect(getFirstTimelineEntry(false)).toMatch('1');
  });

  it('should render confirmation on auth match', () => {
    expect(
      global
        .mount(
          <AuthContext.Provider
            value={{
              state: {
                profile: createdBy,
              },
            }}
          >
            <Timeline {...services} data={data} />
          </AuthContext.Provider>,
        )
        .find(TimelineEntry)
        .first()
        .find(Confirm)
        .exists(),
    ).toBeTruthy();
  });

  it('should not render any dialogs', () => {
    expect(
      global
        .mount(
          <AuthContext.Provider
            value={{
              state: {
                profile: createdBy,
              },
            }}
          >
            <Timeline
              {...services}
              data={data.map((item) => ({
                ...item,
                replies: item.id,
              }))}
            />
          </AuthContext.Provider>,
        )
        .find(TimelineEntry)
        .first()
        .find(Dialog)
        .exists(),
    ).toBeFalsy();
  });
});
