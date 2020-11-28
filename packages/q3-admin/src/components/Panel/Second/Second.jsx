import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';

export const SidebarPanelContent = ({ data }) => {
  const { t } = useTranslation();

  return data.map(
    ({ content: Renderer, description, title }) => (
      <Card
        variant="outlined"
        style={{ boxShadow: 'none !important' }}
      >
        <CardContent>
          <Typography variant="h6" component="h3">
            {t(`titles:${title}`)}
          </Typography>
          <Divider />
          <Typography style={{ marginTop: '1rem' }}>
            {t(`descriptions:${description}`)}
          </Typography>
        </CardContent>
        {Renderer && (
          <CardActions>
            <Renderer />
          </CardActions>
        )}
      </Card>
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
