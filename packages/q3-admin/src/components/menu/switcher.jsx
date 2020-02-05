import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Backspace from '@material-ui/icons/Backspace';
import useOpen from 'useful-state/lib/useOpen';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import Menu from 'q3-ui/lib/menu';
import Button from '@material-ui/core/Button';
import { containsRenderFilterPropFn } from './utils';

const MenuBackButton = ({ text, onClick }) => (
  <Box mb={1}>
    <Button size="small" onClick={onClick}>
      <Backspace />
      <Box
        style={{
          marginLeft: '0.5rem',
          fontSize: '0.733rem',
        }}
      >
        {text}
      </Box>
    </Button>
  </Box>
);

MenuBackButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const MenuSelect = ({ value, options }) => (
  <Select
    id="menu-dropdown"
    value={value}
    variant="outlined"
    component="div"
    fullWidth
  >
    {options.map((item) => (
      <MenuItem
        to={item.to}
        component={Link}
        key={item.to}
        value={item.to}
        dense
      >
        {item.label}
      </MenuItem>
    ))}
  </Select>
);

MenuSelect.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
    }),
  ).isRequired,
};

const MenuSwitcher = ({ activePage, items, title }) => {
  const hasFilters = containsRenderFilterPropFn(activePage);
  const { open, close, isOpen } = useOpen();
  const { t } = useTranslation('labels');

  React.useEffect(() => {
    close();
  }, [activePage]);

  return (
    <>
      {isOpen || !hasFilters ? (
        <Box>
          <Menu title={title} items={items} />
        </Box>
      ) : (
        <Box py={1} px={2}>
          <MenuBackButton
            onClick={open}
            text={t('backToMenu')}
          />
          <MenuSelect
            value={activePage.to}
            options={items}
          />
          {activePage.renderFilter()}
        </Box>
      )}
    </>
  );
};

MenuSwitcher.propTypes = {
  title: PropTypes.string.isRequired,
  activePage: PropTypes.shape({
    renderFilter: PropTypes.func,
    to: PropTypes.string,
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
};

MenuSwitcher.defaultProps = {
  activePage: null,
};

export default MenuSwitcher;
