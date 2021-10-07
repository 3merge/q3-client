import React from 'react';
import { Redirect } from '@reach/router';

const Dashboard = () => (
  <Redirect noThrow to="/app/characters " />
);

export default Dashboard;
