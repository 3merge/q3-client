import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import NavigationLink from '../../NavigationLink';
import withNavigation from '../withNavigation';

const joinClassNames = (a) => a.join(' ');

export const NESTED_DROPDOWN_SELECTOR =
  '& .q3-nav-dropdown';

export const dropdown = ({ alignment }) => {
  const { flexDirection, transform, ...attrs } =
    alignment === 'left'
      ? {
          x: 'right',
          x1: 'left',
          flexDirection: 'row',
          transform: 'rotate(90deg)',
        }
      : {
          x: 'left',
          x1: 'right',
          flexDirection: 'row-reverse',
          transform: 'rotate(-90deg)',
        };

  return {
    transition: 'all 250ms',
    transform: 'translateY(-15px)',
    opacity: 0,
    visibility: 'hidden',
    position: 'absolute',
    '& ul': {
      display: 'block !important',
      margin: 0,
      padding: 0,
    },
    [NESTED_DROPDOWN_SELECTOR]: {
      [attrs.x]: '100%',
      [attrs.x1]: 'auto',
      top: 0,
    },
    '& .q3-nav-dropdown-trigger': {
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection,
      '& svg': {
        transform,
      },
    },
  };
};

const useStyle = makeStyles((theme) => ({
  list: {
    display: 'flex',
  },
  item: {
    display: 'block',
    padding: 0,
    width: 'auto',

    '& ul a, &ul li div': {
      borderLeft: '3px solid transparent',
      padding: '0 1rem !important',
      '&:hover,&:focus': {
        borderColor: theme.palette.primary.main,
      },
    },

    '& ul li': {
      '&:first-of-type': {
        paddingTop: '1rem',
      },

      '&:last-of-type': {
        paddingBottom: '1rem',
      },
    },

    '&:hover > .q3-nav-dropdown,&:focus-within > .q3-nav-dropdown': {
      opacity: 1,
      visibility: 'visible',
      transform: 'translateY(0)',
    },
  },
  dropdown,
}));

const HorizontalNavigation = ({ renderMenu }) => {
  return renderMenu();
};

const MyList = ({ children }) => {
  const { list } = useStyle();
  return <List className={list}>{children}</List>;
};

const MyListItem = (props) => {
  const ref = React.useRef();

  const [alignment, setAlignment] = React.useState('left');
  const cls = useStyle({
    alignment,
  });

  const {
    label,
    icon,
    isExpanded,
    role,
    children = null,
    to,
  } = props;

  const renderExpandedIcon = () => {
    if (typeof isExpanded !== 'boolean') return null;
    return isExpanded ? (
      <ExpandLess style={{}} />
    ) : (
      <ExpandMore style={{}} />
    );
  };

  React.useEffect(() => {
    if (typeof window === 'undefined' || !ref.current)
      return;

    const { innerWidth } = window;
    const {
      x,
      width,
    } = ref.current.getBoundingClientRect();

    setAlignment(
      innerWidth - width < x + 150 ? 'left' : 'right',
    );
  }, [ref.current]);

  return (
    <ListItem className={cls.item}>
      <Box
        className="q3-nav-dropdown-trigger"
        display="flex"
        alignItems="center"
      >
        {renderExpandedIcon()}
        <NavigationLink to={to} label={label} icon={icon} />
      </Box>
      {children && (
        <Box
          ref={ref}
          className={joinClassNames([
            'q3-nav-dropdown',
            cls.dropdown,
          ])}
        >
          <Paper>{children != null && children}</Paper>
        </Box>
      )}
    </ListItem>
  );
};

export default withNavigation(
  MyList,
  MyListItem,
)(HorizontalNavigation);
