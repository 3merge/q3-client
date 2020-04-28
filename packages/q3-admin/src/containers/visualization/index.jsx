import React from 'react';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Statistic from 'q3-ui/lib/statistic';
import { browser } from 'q3-ui-helpers';

export const MongoChart = ({
  id,
  title,
  filters,
  GridProps,
}) => {
  const [src, setSrc] = React.useState();
  const [err, setErr] = React.useState(false);

  React.useEffect(() => {
    if (!browser.isBrowserReady()) return;
    const search = new URLSearchParams();

    if (filters)
      Object.entries(filters).forEach(([key, value]) => {
        search.set(key, value);
      });

    axios
      .get(`/dashboard?id=${id}&${search.toString()}`)
      .then(({ data }) => {
        setSrc(data.url);
      })
      .catch(() => {
        setErr(true);
      });
  }, []);

  if (err) return 'Failed to load';
  if (!src) return 'Loading ...';

  return (
    <Grid item {...GridProps}>
      <Paper>
        <Box height={480} p={2}>
          <iframe
            width="100%"
            height="100%"
            frameBorder={0}
            title={title}
            src={src}
          />
        </Box>
      </Paper>
    </Grid>
  );
};

export const MongoStats = ({
  collectionName,
  query,
  title,
  to,
}) => {
  const [stats, setStats] = React.useState();
  const [err, setErr] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(
        `/statistics?collectionName=${collectionName}&${query}`,
      )
      .then(({ data }) => {
        setStats(data);
      })
      .catch((e) => {
        setErr(e);
      });
  }, []);

  if (stats) return 'Failed to load';
  if (!err) return 'Loading ...';

  return (
    <Statistic
      text={title}
      to={to}
      num={get(stats, 'latest', 0)}
      difference={
        get(stats, 'latest', 0) - get(stats, 'previous', 0)
      }
    />
  );
};
