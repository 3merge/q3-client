import React from 'react';
import { get } from 'lodash';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import { Field } from 'q3-ui-forms/lib/builders';
import { Router } from '@reach/router';
import Admin from 'q3-admin';
import { AuthContext } from 'q3-ui-permissions';
import Dashboard from 'q3-admin/lib/components/Dashboard';
import Chart from 'q3-admin/lib/containers/Chart';
import pages from '../views';

const CustomDashboard = () => {
  return (
    <Dashboard title="Sample" version="1.0.0">
      <Chart
        backgroundColor="#e6d9cd"
        template="newCharacters"
        type="Bar"
        x="month"
        y="newCharacters"
      >
        <Field type="dateRange" name="createdAt" />
        <Field type="text" name="gender" />
      </Chart>
      <Chart
        backgroundColor="#e6d9cd"
        template="newCharacters"
        type="Line"
        x="month"
        y="newCharacters"
      >
        <Field type="dateRange" name="createdAt" />
        <Field type="text" name="gender" />
      </Chart>
    </Dashboard>
  );
};

export default () => {
  const { state } = React.useContext(AuthContext);

  return state.init ? (
    <Router basepath="/app">
      <Admin
        path="*"
        logoSrc="https://image-placeholder.com/images/image-placeholder.png"
        icons={{
          characters: AccessibilityIcon,
        }}
        profileItems={[]}
        AppProps={{
          customRoutes: [<CustomDashboard path="/" />],
          redirectPathForUnauthorizedUsers: '/login',
          pages,
        }}
      />
    </Router>
  ) : (
    'Thinking...'
  );
};
