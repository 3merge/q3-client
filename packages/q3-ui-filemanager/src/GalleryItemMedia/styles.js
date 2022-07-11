import { makeStyles } from '@material-ui/core';
import { IMAGE_EXT_LIST } from '../utils';

export default makeStyles(() => ({
  mask: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
  },
  media: {
    height: 175,
    overflow: 'hidden',
    position: 'relative',
  },
  object: ({ fileType }) =>
    IMAGE_EXT_LIST.includes(fileType)
      ? {
          height: '100%',
          objectFit: 'cover',
          width: '100%',
        }
      : {
          left: 0,
          height: 'auto',
          minHeight: '100%',
          position: 'absolute',
          top: 0,
          width:
            fileType === 'PDF'
              ? 'calc(100% + 16px)'
              : '100%',
        },
}));
