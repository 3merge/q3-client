import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import CollapsiblePanelTitle from './title';
import CollapsiblePanelSubtitle from './subtitle';
import PanelIcon from './panelIcon';
import useStyles from './useStyle';

export { default as Accordion } from './accordion';

const CollapsiblePanel = ({
  title,
  description,
  children,
  show,
  open,
  icon,
  onChange,
  expanded,
  ...rest
}) => {
  const { border, padding, iconFont } = useStyles(rest);

  return show ? (
    <ExpansionPanel
      elevation={0}
      className={border}
      defaultExpanded={open}
      TransitionProps={{ unmountOnExit: true }}
      disabled={!children}
      onChange={onChange}
      expanded={expanded}
    >
      <ExpansionPanelSummary
        style={{ padding: '0 1rem' }}
        expandIcon={
          <PanelIcon hasChildren={children} {...rest} />
        }
      >
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={padding}
        >
          <CollapsiblePanelTitle
            title={title}
            className={iconFont}
            icon={icon}
          />
          <CollapsiblePanelSubtitle
            description={description}
            {...rest}
          />
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box width="100%">{children}</Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ) : null;
};

CollapsiblePanel.propTypes = {
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

  /**
   * Icon to render beside the title.
   */
  icon: PropTypes.node,

  /**
   * Handler for the panel's click event.
   */
  onChange: PropTypes.func,

  /**
   * Controls the open state of the panel.
   */
  expanded: PropTypes.bool,
};

CollapsiblePanel.defaultProps = {
  description: null,
  show: true,
  open: false,
  expanded: false,
  icon: null,
  onChange: null,
};

export default CollapsiblePanel;
