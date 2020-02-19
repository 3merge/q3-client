import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from 'q3-ui/lib/avatar';

const Option = ({
  onClick,
  label,
  description,
  title,
  icon,
}) => (
  <Box my={1}>
    <Grid container>
      <Grid item style={{ width: 45 }}>
        <Avatar icon={icon} word={title} />
      </Grid>
      <Grid item style={{ flex: 1 }}>
        <Typography variant="h5" component="h4">
          {title}
        </Typography>
        {description && (
          <Typography
            component="small"
            display="block"
            style={{ marginBottom: '0.25rem' }}
          >
            {description}
          </Typography>
        )}
        {onClick && (
          <Button
            onClick={onClick}
            variant="contained"
            size="small"
          >
            {label}
          </Button>
        )}
      </Grid>
    </Grid>
  </Box>
);

Option.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
};

Option.defaultProps = {
  description: null,
  onClick: null,
  label: null,
};

export default Option;
