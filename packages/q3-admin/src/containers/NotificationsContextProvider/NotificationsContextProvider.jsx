import React from 'react';
import NotificationsContext from '../NotificationsContext';
import useNotificationsService from '../../hooks/useNotificationsService';

// estlint-disable-next-line
const NotificationsContextProvider = ({ children }) => (
  <NotificationsContext.Provider
    value={useNotificationsService()}
  >
    {children}
  </NotificationsContext.Provider>
);

export default NotificationsContextProvider;
