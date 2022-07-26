import { makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

export default makeStyles(() => ({
  avatar: {
    backgroundColor: 'transparent',
  },
  item: ({ isHovering }) => {
    const out = {
      border: '1px solid',
      borderColor: 'transparent',
      position: 'relative',
      zIndex: 1,
    };

    if (isHovering)
      return {
        ...out,
        borderColor: blue[200],
      };

    return out;
  },
}));
