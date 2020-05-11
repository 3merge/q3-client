import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import BannerWithOffset from 'q3-ui/lib/bannerWithOffset';
import axios from 'axios';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Statistic from 'q3-ui/lib/statistic';
import { object, browser } from 'q3-ui-helpers';
import { Chart } from 'q3-components';

export const getFrom = (url, onData, onError) =>
  axios
    .get(url)
    .then(({ data }) => onData(data))
    .catch(() => {
      onError(true);
    });

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
    getFrom(`${url}&${filters}`, setSrc, setErr);
  }, [filters]);

  return {
    src,
    err,
  };
};

export const MongoChart = ({
  id,
  title,
  defaultQuery,
  filters,
  ...rest
}) => {
  const [initialValues, setInitialValues] = React.useState(
    defaultQuery,
  );

  const { src, err } = useVisualization(
    `/charts?id=${id}`,
    initialValues,
  );

  const url = get(src, 'url');

  if (err) return null;

  if (!url)
    return (
      <Box p={1}>
        <Skeleton
          variant="rect"
          height={480}
          style={{ backgroundColor: '#FFF' }}
        />
      </Box>
    );

  return (
    <Chart
      title={title}
      url={url}
      onSave={setInitialValues}
      query={defaultQuery}
      {...rest}
    >
      {filters}
    </Chart>
  );
};

MongoChart.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  defaultQuery: PropTypes.string.isRequired,
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

  if (err) return null;

  if (!src)
    return (
      <Box p={1}>
        <Skeleton
          variant="rect"
          height={156}
          style={{ backgroundColor: '#FFF' }}
        />
      </Box>
    );

  return (
    <Box p={1}>
      <Statistic
        text={title}
        to={to}
        num={get(src, 'latest', 0)}
        difference={
          get(src, 'latest', 0) - get(src, 'previous', 0)
        }
      />
    </Box>
  );
};

MongoStats.propTypes = {
  collectionName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  filters: PropTypes.shape({}).isRequired,
  to: PropTypes.string.isRequired,
};

const Visualization = ({
  title,
  Changelog,
  charts,
  stats,
}) => {
  const [tabindex, setTab] = React.useState(0);

  return (
    <BannerWithOffset
      title={title}
      fluid={{
        src: 'https://source.unsplash.com/daily?nature',
      }}
      PaperProps={{
        elevation: 0,
        style: {
          backgroundColor: 'whitesmoke',
        },
      }}
    >
      <Box p={2}>
        <Tabs
          value={tabindex}
          onChange={(e, num) => setTab(num)}
          centered
        >
          <Tab value={0} label="Dashboard" />
          <Tab
            value={1}
            label="Changelog"
            disabled={!Changelog}
          />
        </Tabs>
        <Box my={2}>
          {tabindex === 0 && (
            <Grid container>
              <Grid item md={9} sm={8} xs={12}>
                {charts.map((c) => (
                  <MongoChart key={c.id} {...c} />
                ))}
              </Grid>
              <Grid item md={3} sm={4} xs={12}>
                {stats.map((s) => (
                  <MongoStats
                    key={s.collectionName}
                    {...s}
                  />
                ))}
              </Grid>
            </Grid>
          )}
          {tabindex === 1 && Changelog ? (
            <Changelog />
          ) : null}
        </Box>
      </Box>
    </BannerWithOffset>
  );
};

Visualization.propTypes = {
  charts: PropTypes.arrayOf(MongoChart.propTypes),
  stats: PropTypes.arrayOf(MongoStats.propTypes),
  title: PropTypes.string.isRequired,
  Changelog: PropTypes.node,
};

Visualization.defaultProps = {
  Changelog: null,
  charts: [],
  stats: [],
};

export default Visualization;
