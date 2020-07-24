import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { Link } from '@reach/router';
import MuiLink from '@material-ui/core/Link';
import { useTranslation } from 'react-i18next';
import { array, object } from 'q3-ui-helpers';
import useStyle from './useStyle';

const getProps = (className) => ({ isCurrent }) =>
  isCurrent
    ? { className: classnames([className, 'active']) }
    : { className };

const NavigationSubMenu = ({ items }) => {
  const { t } = useTranslation('labels');
  const cls = useStyle();

  const subItems = array.hasLength(items)
    ? items.filter((item) => {
        return object.isIn(item, 'to');
      })
    : [];

  return array.hasLength(subItems) ? (
    <Box my={2}>
      <Divider />
      <Box py={1}>
        {subItems.map((item) => {
          return (
            <Box mb={0.5} key={item.to}>
              <MuiLink
                getProps={getProps(cls.root)}
                component={Link}
                to={item.to}
              >
                {t(item.label)}
              </MuiLink>
            </Box>
          );
        })}
      </Box>
    </Box>
  ) : null;
};

NavigationSubMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};

NavigationSubMenu.defaultProps = {
  items: [],
};

export default NavigationSubMenu;
