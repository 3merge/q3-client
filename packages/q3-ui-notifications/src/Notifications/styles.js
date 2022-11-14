import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  view: ({
    enableBulk,
    enableMessageTypeFiltering,
    enableViews,
  }) => {
    const output = {};

    const addDisplayNoneProperty = (selector) => {
      output[`& ${selector}`] = {
        display: 'none',
      };
    };

    if (!enableBulk) {
      addDisplayNoneProperty('.notification-checkbox');
      addDisplayNoneProperty('.notifications-bulk-buttons');
    }

    if (!enableMessageTypeFiltering)
      addDisplayNoneProperty('.notification-message-types');
    if (!enableViews)
      addDisplayNoneProperty('.notification-views');

    return output;
  },
}));
