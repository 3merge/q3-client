import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import CollapsiblePanelAlert from './alert';
import CollapsiblePanelTitle from './title';
import CollapsiblePanelSubtitle from './subtitle';
import PanelIcon from './panelIcon';
import useStyles from './useStyle';

const CollapsiblePanel = ({
  title,
  description,
  children,
  show,
  open,
  alerts,
  ...rest
}) => {
  const { border, backdrop, padding } = useStyles(rest);

  return show ? (
    <ExpansionPanel
      elevation={0}
      className={border}
      defaultExpanded={open}
    >
      <ExpansionPanelSummary
        expandIcon={<PanelIcon {...rest} />}
      >
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={padding}
        >
          <CollapsiblePanelTitle title={title} />
          <CollapsiblePanelSubtitle
            description={description}
          />
          {alerts.length ? (
            <Box mt={1} width="100%">
              {alerts.map(CollapsiblePanelAlert)}
            </Box>
          ) : null}
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box className={backdrop}>{children}</Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ) : null;
};

CollapsiblePanel.propTypes = {
  /**
   *
   */
  alerts: PropTypes.arrayOf(
    PropTypes.shape(CollapsiblePanelAlert.propTypes),
  ),

  /**
   * Title text.
   */
  title: PropTypes.string.isRequired,

  /**
   * Supporting content.
   */
  description: PropTypes.string,

  /**
   * Nodes to render inside collapsed view area.
   */
  children: PropTypes.node.isRequired,

  /**
   * Determines if the panel renders.
   */
  show: PropTypes.bool,

  /**
   * Determines if the collapsible content is viewable.
   */
  open: PropTypes.bool,
};

CollapsiblePanel.defaultProps = {
  alerts: [],
  description: null,
  show: true,
  open: false,
};

export default CollapsiblePanel;
