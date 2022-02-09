import React from 'react';
import { Domain } from '../containers/state';

export default () => React.useContext(Domain) || {};
