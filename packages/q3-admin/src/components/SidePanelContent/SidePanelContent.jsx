import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import useStyle from './useStyle';

export const SidebarPanelContent = ({
  title,
  children,
  transitionDelay,
}) => {
  const { subtext } = useStyle();
  const { t } = useTranslation();

  return (
    <Box
      width="100%"
      style={{ borderTop: '2px solid #f5f7f9' }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        px={1}
        pt={1}
      >
        <Typography variant="overline" color="primary">
          {t(`titles:${title}`)}
        </Typography>
      </Box>
      {children && (
        <Box mt={0.5} mb={1} className={subtext}>
          {children}
        </Box>
      )}
    </Box>
  );
};

SidebarPanelContent.defaultProps = {
  transitionDelay: 0,
};

SidebarPanelContent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  transitionDelay: PropTypes.number,
};

export default SidebarPanelContent;
