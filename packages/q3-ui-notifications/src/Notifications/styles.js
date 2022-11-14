import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  view: ({
    enableBulk,
    enableMessageTypeFiltering,
    enableViews,
  }) => {
    const output = {};

    if (!enableBulk)
      output['& .notification-checkbox'] = {
        display: 'none',
      };

    if (!enableMessageTypeFiltering)
      output['& .notification-message-types'] = {
        display: 'none',
      };

    if (!enableViews)
      output['& .notification-views'] = {
        display: 'none',
      };

    return output;
  },
}));
