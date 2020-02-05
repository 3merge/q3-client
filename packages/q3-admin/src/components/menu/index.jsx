import React from 'react';
import PropTypes from 'prop-types';
import { Location, Link } from '@reach/router';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Backspace from '@material-ui/icons/Backspace';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'q3-ui-permissions';
import Menu from 'q3-ui/lib/menu';
import Button from '@material-ui/core/Button';
import { makePath } from '../app';

const MenuSwitcher = ({ activePage, items, title }) => {
  const [showAll, setShowAll] = React.useState(false);
  const { t } = useTranslation('labels');
  const hasFilters =
    activePage &&
    activePage.renderFilter &&
    typeof activePage.renderFilter === 'function';

  React.useEffect(() => {
    setShowAll(false);
  }, [activePage]);

  return (
    <>
      <Collapse in={showAll || !hasFilters} timeout={500}>
        <Box>
          <Menu title={title} items={items} />
        </Box>
      </Collapse>

      <Collapse in={!showAll} timeout={500}>
        <Box p={2}>
          {hasFilters && (
            <>
              <Button
                size="small"
                onClick={() => setShowAll(true)}
              >
                <Backspace />
                <Box
                  style={{
                    marginLeft: '0.5rem',
                    fontSize: '0.733rem',
                  }}
                >
                  {t('backToMenu')}
                </Box>
              </Button>
              <Select
                id="menu-dropdown"
                value={activePage.to}
                variant="outlined"
                component="div"
                fullWidth
              >
                {items.map((item) => (
                  <MenuItem
                    to={item.to}
                    component={Link}
                    key={item.to}
                    value={item.to}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              {activePage.renderFilter()}
            </>
          )}
        </Box>
      </Collapse>
    </>
  );
};

const AppMenu = ({ companyName, pages }) => {
  const { t } = useTranslation();
  if (!Array.isArray(pages)) return null;

  const items = pages
    .filter((page) => page.index)
    .map((page) => ({
      ...page,
      to: makePath(page),
      visible: useAuth(page.collectionName).canSee,
      label: t(`labels:${page.resourceName}`),
      icon: page.icon,
    }));

  return (
    <Location>
      {({ location }) => {
        const active = items.find(
          ({ to }) => to === location.pathname,
        );

        return (
          <MenuSwitcher
            activePage={active}
            title={companyName}
            items={items}
          />
        );
      }}
    </Location>
  );
};

AppMenu.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      collectionName: PropTypes.string,
      resourceName: PropTypes.string,
      icon: PropTypes.object,
    }),
  ).isRequired,

  /**
   * The software's identity.
   */
  companyName: PropTypes.string,
};

AppMenu.defaultProps = {
  companyName: '3merge',
};

export default AppMenu;
