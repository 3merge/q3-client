import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import useStyle from './useStyle';

export const Panel = ({
  title,
  children,
  onClick,
  badgeContent,
}) => {
  const { bordered, subtext } = useStyle();
  const { t } = useTranslation();

  return (
    <Box className={bordered} mb={1} mt={0.25}>
      <Typography variant="overline">
        <Badge
          badgeContent={badgeContent}
          color="secondary"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <span style={{ fontWeight: '800 !important' }}>
            {t(`titles:${title}`)}
          </span>
        </Badge>
      </Typography>
      <Divider
        style={{
          border: '1px solid rgba(104, 113, 123, 0.05)',
        }}
      />
      <Box my={1} className={subtext}>
        {children}
      </Box>
      {onClick && (
        <Button
          size="small"
          variant="contained"
          onClick={onClick}
        >
          {t('labels:seeMore')}
        </Button>
      )}
    </Box>
  );
};

Panel.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Panel.defaultProps = {
  onClick: null,
};

export default Panel;
