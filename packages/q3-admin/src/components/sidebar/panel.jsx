import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import useStyle from './useStyle';

export const Panel = ({ title, children, onClick }) => {
  const { bordered, subtext } = useStyle();
  const { t } = useTranslation();

  return (
    <Box className={bordered} my={2}>
      <Typography variant="overline">{title}</Typography>
      <Divider />
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
