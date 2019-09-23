import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  iconCls: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
  },
}));

const CardComplete = ({ Icon, title, description, to }) => {
  const { iconCls } = useStyles();
  return (
    <Card elevation={0}>
      <img src={Icon} alt={title} className={iconCls} />
      <CardContent>
        <Box mt={1} mb={2}>
          <Typography gutterBottom variant="h2">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {description}
          </Typography>
        </Box>
        <Button
          to={to}
          component={Link}
          variant="contained"
          color="secondary"
        >
          Go
        </Button>
      </CardContent>
    </Card>
  );
};

CardComplete.propTypes = {
  Icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default CardComplete;
