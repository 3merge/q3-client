import React from 'react';
import PropTypes from 'prop-types';
import MockRest from 'q3-ui-test-utils/lib/rest';
import Visualization from './Visualization';

export default {
  title: 'Q3 Admin|Containers/Visualization',
};

const MockDashboardServices = (props) => (
  <MockRest
    delay={4000}
    define={(r) => {
      r.onGet(/\/charts\?id=*/).reply(200, {
        url: '//datawrapper.dwcdn.net/Wa2Ci/17/',
      });

      r.onGet(/\/statistics\?collectionName=*/).reply(200, {
        previous: 10,
        latest: 15,
      });

      return r;
    }}
  >
    <Visualization {...props} />
  </MockRest>
);

export const WithChartsAndStats = () => (
  <MockDashboardServices
    title="Dashboard"
    charts={[
      { id: '1', title: 'MyChart' },
      { id: '1', title: 'MyChart1' },
      { id: '1', title: 'MyChart2' },
    ]}
    stats={[
      {
        collectionName: 'stat',
        title: 'New charts',
        to: '/',
      },
      {
        collectionName: 'stat',
        title: 'New charts',
        to: '/',
      },
    ]}
  />
);

export const WithChangelog = () => (
  <MockDashboardServices
    title="Dashboard"
    charts={[
      { id: '1', title: 'MyChart' },
      { id: '1', title: 'MyChart1' },
      { id: '1', title: 'MyChart2' },
    ]}
    stats={[
      {
        collectionName: 'stat',
        title: 'New charts',
        to: '/',
      },
      {
        collectionName: 'stat',
        title: 'New charts',
        to: '/',
      },
    ]}
    Changelog={() => <p>Stuff we have been doing</p>}
  />
);
