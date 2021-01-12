import React from 'react';
import { Box, Grid, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  TextRotateVertical,
  TextRotationNone,
} from '@material-ui/icons';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import AppBar from '../AppBar';
import Horizontal from '../Horizontal';
import Vertical from '../Vertical';
import menuItems from '../../tests/fixtures/menu';

const HORIZONTAL = 'row';
const VERTICAL = 'column';

const NAVIGATION_ORIENTATION_VARIANTS = {
  [HORIZONTAL]: {
    Element: Horizontal,
    Icon: TextRotateVertical,
  },
  [VERTICAL]: {
    Element: Vertical,
    Icon: TextRotationNone,
  },
};

const Navigation = ({
  enableOrientationChange,
  orientation,
}) => {
  const [
    defaultOrientation,
    setDefaultOrientation,
  ] = React.useState(orientation);

  const [verticalWidth, setVerticalWidth] = React.useState(
    210,
  );

  const changeOrientation = () =>
    setDefaultOrientation(
      defaultOrientation === VERTICAL
        ? HORIZONTAL
        : VERTICAL,
    );

  const toggleWidth = () =>
    setVerticalWidth(verticalWidth === 210 ? 75 : 210);

  const getDimensionalValue = (fn) => () =>
    fn(defaultOrientation === VERTICAL);

  const getHeight = getDimensionalValue((isVertical) =>
    isVertical ? '100vh' : 'auto',
  );

  const getLogoWidth = getDimensionalValue((isVertical) =>
    isVertical ? '100%' : verticalWidth,
  );

  const getWidth = getDimensionalValue((isVertical) =>
    isVertical ? verticalWidth : '100%',
  );

  const { Element, Icon } = NAVIGATION_ORIENTATION_VARIANTS[
    defaultOrientation
  ];

  return (
    <Box
      display="inline-block"
      height={getHeight()}
      position="relative"
      width="auto"
    >
      <IconButton
        style={{
          position: 'absolute',
          right: '-2rem',
          top: '1rem',
          zIndex: 1,

          transform:
            verticalWidth === 210
              ? undefined
              : 'rotate(180deg)',
        }}
        onClick={toggleWidth}
      >
        <MenuOpenIcon />
      </IconButton>
      <Box
        height="100%"
        overflow="hidden"
        position="relative"
        width={getWidth()}
      >
        <Box height="100%" minWidth={210} width="100%">
          <AppBar flexDirection={defaultOrientation}>
            <Grid
              alignItems="center"
              container
              direction={defaultOrientation}
              disableGutters
            >
              <Grid
                item
                style={{
                  background: 'blue',
                  width: getLogoWidth(),
                }}
              >
                <img
                  alt="logo"
                  src="https://logoipsum.com/logo/logo-26.svg"
                  width="100%"
                />
              </Grid>
              <Grid item>
                <Element menuItems={menuItems} />
              </Grid>
            </Grid>
            {enableOrientationChange && (
              <Box display="inline-block">
                <IconButton onClick={changeOrientation}>
                  <Icon />
                </IconButton>
              </Box>
            )}
          </AppBar>
        </Box>
      </Box>
    </Box>
  );
};

Navigation.defaultProps = {
  enableOrientationChange: true,
  orientation: VERTICAL,
};

Navigation.propTypes = {
  enableOrientationChange: PropTypes.bool,
  orientation: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
};

export default Navigation;
