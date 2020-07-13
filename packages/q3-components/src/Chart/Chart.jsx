import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import FilterIcon from '@material-ui/icons/FilterList';
import Paper from '@material-ui/core/Paper';
import IconButton from 'q3-ui/lib/iconButton';
import Inline from '../Inline';

const Chart = ({ url, title, children }) => (
  <Box p={1}>
    <Paper>
      <Box height={480} p={2} position="relative">
        <Box position="absolute" top="1rem" right="1rem">
          <Inline
            title="Filter"
            renderContent={children}
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
  children: PropTypes.func.isRequired,
};

export default Chart;
