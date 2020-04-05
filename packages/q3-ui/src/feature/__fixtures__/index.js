import React from 'react';
import Camera from '@material-ui/icons/Camera';

export const required = {
  title: 'New Ultra Wide camera',
  body:
    'Go big — the new Ultra Wide camera captures four times more scene',
};

export const withIcon = {
  ...required,
  // eslint-disable-next-line
  icon: <Camera />,
};

export const withImage = {
  ...required,
  imgSrc:
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
};
