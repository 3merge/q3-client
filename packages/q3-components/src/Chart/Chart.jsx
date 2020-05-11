import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FilterIcon from '@material-ui/icons/FilterList';
import Paper from '@material-ui/core/Paper';
import IconButton from 'q3-ui/lib/iconButton';
import { EncodedUrl } from 'q3-ui-forms/lib/adapters';
import Inline from '../Inline';

const Chart = ({
  url,
  title,
  children,
  onSave,
  initialValues,
}) => (
  <Box p={1}>
    <Paper>
      <Box height={480} p={2} position="relative">
        <Box position="absolute" top="1rem" right="1rem">
          <Inline
            title="Filter"
            renderContent={() => (
              <EncodedUrl
                onSave={onSave}
                initialValues={initialValues}
              >
                {children}
                <Button type="submit">Apply</Button>
              </EncodedUrl>
            )}
            renderTrigger={(onClick) => (
              <IconButton
                icon={FilterIcon}
                label="Filter"
                buttonProps={{ onClick }}
              />
            )}
          />
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
