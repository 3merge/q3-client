import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Field } from 'q3-ui-forms/lib/builders';
import Paper from '@material-ui/core/Paper';
import InlineEditor from '../InlineEditor';

const Chart = ({ url, title, filters, onSubmit }) => (
  <Box p={1}>
    <Paper>
      <Box height={480} p={2} position="relative">
        <Box position="absolute" top="1rem" right="1rem">
          <InlineEditor
            title="Date ranges"
            initialValues={filters}
            onSubmit={onSubmit}
          >
            <Field name="from" type="date" />
            <Field name="to" type="date" />
          </InlineEditor>
        </Box>
        <iframe
          width="100%"
          height="100%"
          frameBorder={0}
          title={title}
          src={url}
        />
      </Box>
    </Paper>
  </Box>
);

Chart.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  filters: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

Chart.defaultProps = {
  filters: {
    from: '',
    to: '',
  },
};

export default Chart;
