import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import JSONPretty from 'react-json-pretty';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import Avatar from '../avatar';
import 'react-json-pretty/themes/acai.css';

const BlockText = styled(Typography)({
  display: 'block',
  lineHeight: 1,
});

export const TimelineSkeleton = () => (
  <Grid container spacing={1}>
    <Grid item md={3} sm={4} xs={12}>
      <Box align="right">
        <Skeleton variant="circle" width="2rem" />
        <Skeleton variant="text" width="4rem" />
      </Box>
    </Grid>
    <Grid item md={9} sm={8} xs={12}>
      <Paper>
        <Box p={1}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
      </Paper>
    </Grid>
  </Grid>
);

export const TimelineMeta = ({
  firstName,
  lastName,
  photo,
  date,
}) => {
  const name = `${firstName} ${lastName}`;
  const stamp = moment(new Date(date).toISOString()).format(
    'MMMM Do YYYY',
  );

  return (
    <Grid item md={3} sm={4} xs={12}>
      <Box textAlign="right">
        <Box mb={1}>
          <Avatar imgSrc={photo} word={name} />
        </Box>
        <BlockText variant="overline" gutterBottom>
          {name}
        </BlockText>
        <BlockText variant="body1">{stamp}</BlockText>
      </Box>
    </Grid>
  );
};

TimelineMeta.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  photo: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};

TimelineMeta.defaultProps = {
  date: new Date(),
  firstName: 'SYS',
  lastName: null,
  photo: null,
};

export const TimelineContainer = ({
  id,
  meta,
  children,
}) => (
  <Box mb={1} component="figure">
    <Grid container spacing={1}>
      {meta}
      <Grid item md={9} sm={8} xs={12}>
        <Paper elevation={2}>
          <Box p={1}>{children}</Box>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

const Timeline = ({ entries }) =>
  entries.map((entry) => (
    <TimelineContainer
      key={entry.id}
      meta={
        <TimelineMeta date={entry.date} {...entry.user} />
      }
    >
      <JSONPretty
        mainStyle="background-color: #FFF"
        id={entry.id}
        data={entry.diff}
      />
    </TimelineContainer>
  ));

Timeline.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.date,
      user: PropTypes.object,
      diff: PropTypes.obj,
      op: PropTypes.string,
    }),
  ),
};

Timeline.defaultProps = {
  entries: [],
};

export default Timeline;
