import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ProfileBar from 'q3-ui/lib/profileBar';
import useStyles from './useStyle';
import useMenu from './useMenu';

const Main = ({
  render,
  pages,
  ProfileBarProps: { menuItems = [], ...profileProps },
}) => {
  const cls = useStyles();
  const items = useMenu(pages);

  return (
    <Box className={cls.wrapper}>
      <Grid container className={cls.offsetHeight}>
        <Grid item>
          <ProfileBar
            {...profileProps}
            popoutMenuItems={menuItems}
            items={items}
          />
        </Grid>
        <Grid
          id="q3-main-view"
          item
          className={cls.muted}
          component="main"
        >
          {render ? render() : null}
        </Grid>
      </Grid>
    </Box>
  );
};

Main.propTypes = {
  /**
   * Renderer function for inside <main />.
   */
  render: PropTypes.func,

  /**
   * Props passed directly to Q3's <ProfileBar />
   */
  ProfileBarProps: PropTypes.shape({
    name: PropTypes.string,
    imgSrc: PropTypes.string,
    menuItems: PropTypes.array,
  }).isRequired,

  pages: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
      icon: PropTypes.node,
      visible: PropTypes.bool,
    }),
  ).isRequired,
};

Main.defaultProps = {
  render: null,
};

export default Main;
