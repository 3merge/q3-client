/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MuiIconButton from '@material-ui/core/IconButton';
import IconButton from 'q3-ui/lib/iconButton';
import Hidden from '@material-ui/core/Hidden';
import useStyle from './styles';

const ButtonWithIcon = React.forwardRef(
  ({ icon: Icon, label, count, ...rest }, ref) => {
    const { t } = useTranslation('labels');
    const cls = useStyle();

    return (
      <Box display="inline">
        <Hidden smDown implementation="css">
          <Button
            ref={ref}
            style={{ margin: '0 .25rem' }}
            aria-label={t(label)}
            variant="contained"
            elevation={4}
            {...rest}
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
              <Box
                alignItems="center"
                display="inline-flex"
                ml={-1}
                mr={0.15}
              >
                <MuiIconButton
                  color="inherit"
                  size="small"
                  component={Box}
                >
                  <Icon />
                </MuiIconButton>
              </Box>
            </Badge>
            <span>{t(label)}</span>
          </Button>
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            label={label}
            icon={Icon}
            buttonProps={rest}
          />
        </Hidden>
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
};

ButtonWithIcon.defaultProps = {
  count: 0,
};

export default ButtonWithIcon;
