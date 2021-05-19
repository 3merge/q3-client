import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import { map } from 'lodash';
import { ActionsContext } from '../ActionBar';
import useStyle from './styles';

const ActionBarMobile = () => (
  <BottomNavigation classes={useStyle()}>
    {map(
      React.useContext(ActionsContext),
      ({ icon: Icon, label, ...rest }) => (
        <BottomNavigationAction
          label={label}
          icon={<Icon />}
          {...rest}
        />
      ),
    )}
  </BottomNavigation>
);

export default ActionBarMobile;
