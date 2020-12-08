import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import PhotoUpload from '../PhotoUpload';
import { FileUploadPreview } from '../PhotoUpload/PhotoUpload';
import Drop from '../Drop';

const useStyles = makeStyles(() => ({
  grid: {
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '10px',
    '& img': {
      objectFit: 'cover',
    },
  },
  base: {
    gridRow: '1 / 3',
    gridColumn: '1 / 3',
    '& > div': {
      width: '100%',
      height: '100%',
    },
  },
  rest: {
    gridRow: '1 / 3',
    gridColumn: '3 / -1',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
  },
  test: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  deleteIcon: {
    position: 'absolute',
    top: '10px',
    right: '20px',
  },
}));

const Test = ({ src }) => {
  const [state, setState] = React.useState(false);

  const showOverlay = () => setState(true);
  const hideOverlay = () => setState(false);

  const cls = useStyles();
  return (
    <div
      className={cls.test}
      onMouseOver={showOverlay}
      onMouseLeave={hideOverlay}
      onFocus={showOverlay}
      onBlur={hideOverlay}
    >
      <FileUploadPreview src={src} />
      <div
        className={cls.overlay}
        style={{ display: state ? 'block' : 'none' }}
      >
        <Delete className={cls.deleteIcon} />
      </div>
    </div>
  );
};

const Gallery = ({ files }) => {
  const cls = useStyles();
  const base = files[0];
  const rest = files.slice(1, files.length - 1);

  return (
    <div className={cls.grid}>
      <div className={cls.base}>
        <Test src={base} />
      </div>
      {/* {rest.length ? (
        <div className={cls.rest}>
          {rest.map((src) => (
            <PhotoUpload src={src} />
          ))}
        </div>
      ) : null} */}
    </div>
  );
};

export default Gallery;
