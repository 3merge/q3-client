import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Button, List, ListItem } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import useSegments from '../../hooks/useSegments';
import useStyle from './styles';

const NavbarListItemSegments = ({
  isActive,
  to,
  segments,
}) => {
  const data = Object.entries(segments).map(
    ([segment, value]) => ({
      key: segment,
      label: segment,
      value,
    }),
  );

  const cls = useStyle();
  const { t } = useTranslation('labels');
  const { active } = useSegments(data);

  return (
    <ListItem className={cls.segments}>
      <List className={cls.list}>
        <ListItem className={cls.listItem}>
          <Button
            className={
              isActive && !active
                ? cls.activeSegment
                : undefined
            }
            color="inherit"
            component={Link}
            fullWidth
            to={to}
          >
            {t('all')}
          </Button>
        </ListItem>
        {data.map(({ label, value }) => (
          <ListItem className={cls.listItem}>
            <Button
              className={
                active === label
                  ? cls.activeSegment
                  : undefined
              }
              color="inherit"
              component={Link}
              fullWidth
              to={to + value}
            >
              {t(label)}
            </Button>
          </ListItem>
        ))}
      </List>
    </ListItem>
  );
};

NavbarListItemSegments.defaultProps = {
  isActive: false,
};

NavbarListItemSegments.propTypes = {
  isActive: PropTypes.bool,
  to: PropTypes.string.isRequired,
  // eslint-disable-next-line
  segments: PropTypes.object.isRequired,
};

export default NavbarListItemSegments;
