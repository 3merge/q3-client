import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyle from './useStyle';

const TransitionOverride = ({ in: show, children }) => (
  <div style={{ display: show ? 'block' : 'none' }}>
    {children}
  </div>
);

const RepeaterCollapse = ({ children, label, toggles }) => {
  const { container, content, root, pagination, text } =
    useStyle();

  return label ? (
    <Accordion
      defaultExpanded
      className={root}
      TransitionComponent={TransitionOverride}
    >
      <AccordionSummary
        className={container}
        expandIcon={<ExpandMoreIcon />}
      >
        <Grid
          alignItems="center"
          container
          justify="space-between"
        >
          <Grid item xs>
            <Typography className={text} variant="overline">
              {label}
            </Typography>
          </Grid>
          <Grid
            item
            className={pagination}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {toggles}
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails
        data-group={label}
        className={content}
      >
        <Box width="100%">{children}</Box>
      </AccordionDetails>
    </Accordion>
  ) : (
    <Box className={root}>{children}</Box>
  );
};

RepeaterCollapse.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
};

RepeaterCollapse.defaultProps = {
  label: undefined,
};

export default RepeaterCollapse;
