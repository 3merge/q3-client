import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { Link } from 'gatsby';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: theme.spacing(0.25),
    '& > div': {
      background: theme.palette.primary.main,
      borderRadius: 15,
      maxWidth: theme.spacing(2),
      width: '100%',
    },
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    lineHeight: 1,
    fontWeight: '600',
    [theme.breakpoints.up('md')]: {
      minWidth: 'none !important',
    },
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const HorizontalMenuList = ({ items }) => (
  <Location>
    {({ location: { pathname } }) => {
      const checkLocation = () => {
        const index = items.findIndex(
          ({ href }) => href !== '' && pathname === href,
        );
        return index;
      };

      return (
        <StyledTabs
          value={checkLocation()}
          aria-label="Main navigation"
          TabIndicatorProps={{ children: <div /> }}
        >
          {items.map(
            ({ href, visible, label }, i) =>
              visible && (
                <StyledTab
                  component={Link}
                  to={href}
                  key={href}
                  label={label}
                  {...a11yProps(i)}
                />
              ),
          )}
        </StyledTabs>
      );
    }}
  </Location>
);

HorizontalMenuList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      visible: PropTypes.bool,
    }),
  ),
};

HorizontalMenuList.defaultProps = {
  items: [],
};

export default HorizontalMenuList;
