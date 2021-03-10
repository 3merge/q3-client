import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyle from './useStyle';

export const SidebarPanelContent = ({
  title,
  children,
  gutters,
}) => {
  const { subtext, bordered } = useStyle();
  const { t } = useTranslation();

  return (
    <Box width="100%" className={bordered}>
      <Box
        display="flex"
        justifyContent="space-between"
        pl={1}
      >
        <Typography variant="overline" color="inherit">
          {t(`titles:${title}`)}
        </Typography>
      </Box>
      {children && (
        <Box
          mt={0.5}
          mb={gutters ? 2 : 1}
          px={1}
          className={subtext}
        >
          {children}
        </Box>
      )}
    </Box>
  );
};

SidebarPanelContent.defaultProps = {
  gutters: false,
};

SidebarPanelContent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  gutters: PropTypes.bool,
};

export default SidebarPanelContent;
