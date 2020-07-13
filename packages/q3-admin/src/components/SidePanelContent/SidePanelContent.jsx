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
}) => {
  const { subtext, bordered } = useStyle();
  const { t } = useTranslation();

  return (
    <Box px={1} width="100%" className={bordered}>
      <Box
        display="flex"
        justifyContent="space-between"
        px={1}
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

SidebarPanelContent.defaultProps = {};

SidebarPanelContent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SidebarPanelContent;
