import React from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Drop from '../Drop';
import useStyles from './useStyles';

const Gallery = ({ images, onDrop }) => {
  const cls = useStyles();
  const onDelete = () => {};

  return (
    <Drop onDrop={onDrop}>
      {() => (
        <GridList
          cellHeight={200}
          spacing={2}
          className={cls.gridList}
          cols={4}
        >
          {images.map((img, i) => (
            <GridListTile cols={i === 0 ? 2 : 1} key={img}>
              <img src={img} alt="hello" />
              <GridListTileBar
                titlePosition="top"
                actionIcon={
                  <IconButton
                    aria-label="delete"
                    onClick={onDelete}
                  >
                    <Delete style={{ color: '#fff' }} />
                  </IconButton>
                }
                className={cls.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
      )}
    </Drop>
  );
};

Gallery.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  images: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
};

export default Gallery;
