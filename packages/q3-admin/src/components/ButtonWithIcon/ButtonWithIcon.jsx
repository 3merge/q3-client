/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import useStyle from './styles';

const ButtonWithIcon = React.forwardRef(
  ({ icon: Icon, label, count, on, ...rest }, ref) => {
    const { t } = useTranslation('labels');
    const cls = useStyle({
      on,
    });

    return (
      <Box display="inline">
        <Fade in>
          <Box ml={0.5}>
            <Tooltip title={label}>
              <Fab
                {...rest}
                size="small"
                elevation={0}
                ref={ref}
                className={cls.fab}
                aria-label={t(label)}
                variant="contained"
                color="default"
              >
                <Badge
                  badgeContent={count}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  showZero={false}
                  className={cls.badge}
                >
                  <Icon />
                </Badge>
              </Fab>
            </Tooltip>
          </Box>
        </Fade>
      </Box>
    );
  },
);

ButtonWithIcon.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.number,
  on: PropTypes.bool,
};

ButtonWithIcon.defaultProps = {
  count: 0,
  on: false,
};

export default ButtonWithIcon;
