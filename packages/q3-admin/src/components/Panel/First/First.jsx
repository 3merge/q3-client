import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@material-ui/core';

export const SidebarPanelContent = ({ data }) => {
  const { t } = useTranslation();

  return data.map(
    ({ content: Renderer, description, title }) => (
      <Box px={1}>
        <Typography variant="overline" color="primary">
          {t(`titles:${title}`)}
        </Typography>
        <Box mt={0.5} mb={2}>
          <Typography style={{ fontSize: '.933rem' }}>
            {t(`descriptions:${description}`)}
          </Typography>
          {Renderer && (
            <Box mt={1}>
              <Renderer />
            </Box>
          )}
        </Box>
      </Box>
    ),
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
