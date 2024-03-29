/* eslint-disable no-param-reassign */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import useStyle from './styles';

const ButtonWithIcon = React.forwardRef(
  (
    {
      icon: Icon,
      label,
      count,
      on,
      transparent,
      className,
      ...rest
    },
    ref,
  ) => {
    const { t } = useTranslation('labels');
    const cls = useStyle({
      on,
      transparent,
    });

    return (
      <Box display="inline">
        <Box className={cls.wrapper}>
          <Tooltip arrow title={t(label)}>
            <Fab
              {...rest}
              size="small"
              elevation={0}
              ref={ref}
              className={classnames(
                ...[cls.fab, className]
                  .flat()
                  .filter(Boolean),
              )}
              aria-label={t(label)}
              variant="contained"
              color="default"
              data-on={on}
            >
              <Badge
                badgeContent={count}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                showZero={false}
                className={cls.badge}
                variant="dot"
              >
                <Icon />
              </Badge>
            </Fab>
          </Tooltip>
        </Box>
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
  transparent: PropTypes.bool,
  className: PropTypes.string,
};

ButtonWithIcon.defaultProps = {
  count: 0,
  on: false,
  transparent: false,
  className: undefined,
};

export default ButtonWithIcon;
