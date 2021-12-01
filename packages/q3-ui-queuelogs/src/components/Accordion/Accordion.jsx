import React from 'react';
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { size } from 'lodash';
import { useTranslation } from 'q3-ui-locale';

const Accordion = ({
  children,
  data,
  showEmpty,
  title,
}) => {
  const { t } = useTranslation('titles');
  return (
    (size(data) > 0 || showEmpty) && (
      <MuiAccordion variant="outlined" defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{t(title)}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </MuiAccordion>
    )
  );
};
Accordion.defaultProps = {
  data: [],
  showEmpty: false,
};

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  showEmpty: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Accordion;
