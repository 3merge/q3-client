import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Statistic from 'q3-ui/lib/statistic';
import { object, browser } from 'q3-ui-helpers';
import Display from '../../components/display';

export const getFrom = (url, onData, onError) =>
  axios
    .get(url)
    .then(({ data }) => onData(data))
    .catch((e) => onError(e));

export const makeQueryString = (filters) => {
  if (!object.hasKeys(filters)) return '';

  const search = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    search.set(key, value);
  });

  return `&${search.toString()}`;
};

export const useVisualization = (url, filters) => {
  const [src, setSrc] = React.useState();
  const [err, setErr] = React.useState(false);

  React.useEffect(() => {
    if (!browser.isBrowserReady()) return;

    getFrom(
      `${url}${makeQueryString(filters)}`,
      setSrc,
      setErr,
    );
  }, []);

  return {
    src,
    err,
  };
};

export const MongoChart = ({
  id,
  title,
  filters,
  GridProps,
}) => {
  const { src, err } = useVisualization(
    `/dashboard?id=${id}`,
    filters,
  );

  return (
    <Display loading={!get(src, 'url')} error={err}>
      <Grid item {...GridProps}>
        <Paper>
          <Box height={480} p={2}>
            <iframe
              width="100%"
              height="100%"
              frameBorder={0}
              title={title}
              src={src.url}
            />
          </Box>
        </Paper>
      </Grid>
    </Display>
  );
};

MongoChart.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  filters: PropTypes.shape({}).isRequired,
  GridProps: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
  }).isRequired,
};

export const MongoStats = ({
  collectionName,
  filters,
  title,
  to,
}) => {
  const { src, err } = useVisualization(
    `/statistics?collectionName=${collectionName}`,
    filters,
  );

  return (
    <Display loading={!src} error={err}>
      <Statistic
        text={title}
        to={to}
        num={get(src, 'latest', 0)}
        difference={
          get(src, 'latest', 0) - get(src, 'previous', 0)
        }
      />
    </Display>
  );
};

MongoStats.propTypes = {
  collectionName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  filters: PropTypes.shape({}).isRequired,
  to: PropTypes.string.isRequired,
};
