import { makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

export default makeStyles(() => ({
  item: ({ selected }) =>
    selected
      ? {
          border: `1px solid ${blue[500]}`,
        }
      : {},
}));
