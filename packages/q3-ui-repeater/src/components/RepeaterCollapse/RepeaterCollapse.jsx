import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyle from './useStyle';

const RepeaterCollapse = ({ children, label }) => {
  const { container, content, root, text } = useStyle();

  return label ? (
    <Accordion defaultExpanded className={root}>
      <AccordionSummary
        className={container}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={text} variant="overline">
          {label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={content}>
        <Box width="100%">{children}</Box>
      </AccordionDetails>
    </Accordion>
  ) : (
    children
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
