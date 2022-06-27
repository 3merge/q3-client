import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import {
  Button,
  ListItem,
  Collapse,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { object } from 'q3-ui-helpers';
import { useToggle } from 'useful-state';
import { useTranslation } from 'q3-ui-locale';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import PagesIcon from '@material-ui/icons/Pages';
import useStyle from './styles';
import NavbarListItemSegments from '../NavbarListItemSegments';

const NavbarList = ({
  segments,
  to,
  label,
  icon: IconComponent,
}) => {
  const { t } = useTranslation('labels');
  const [current, setCurrent] = React.useState(false);
  const { open, close, toggle, state } = useToggle();
  const cls = useStyle({
    state,
  });

  const handleGetProps = ({ isPartiallyCurrent }) =>
    setCurrent(isPartiallyCurrent);

  React.useEffect(() => {
    if (current) open();
    else close();
  }, [current]);

  const Icon = React.useMemo(
    () =>
      IconComponent ? <IconComponent /> : <PagesIcon />,
    [],
  );

  const ListItemProps = {
    classes: {
      selected: cls.listItemSelected,
      root: cls.listItem,
    },
    selected: current,
  };

  return !object.hasKeys(segments) ? (
    <ListItem {...ListItemProps}>
      <Button
        color="inherit"
        component={Link}
        fullWidth
        to={to}
        getProps={handleGetProps}
        startIcon={Icon}
        endIcon={<span />}
      >
        {label}
      </Button>
    </ListItem>
  ) : (
    <>
      <ListItem {...ListItemProps}>
        <Button
          className={cls.button}
          color="inherit"
          startIcon={Icon}
          fullWidth
          onClick={toggle}
        >
          {t(label)}
        </Button>
        <Link
          aria-label="all"
          className={cls.hidden}
          to={to}
          getProps={handleGetProps}
        />
      </ListItem>
      <Collapse in={state}>
        <NavbarListItemSegments
          isActive={current}
          segments={segments}
          to={to}
        />
      </Collapse>
    </>
  );
};

NavbarList.defaultProps = {
  icon: null,
  segments: {},
};

NavbarList.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  // eslint-disable-next-line
  segments: PropTypes.object,
};

export default NavbarList;
