import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { EncodedUrl } from 'q3-ui-forms/lib/adapters';
import { Next } from 'q3-ui-forms/lib/builders';
import Box from '@material-ui/core/Box';
import FilterList from '@material-ui/icons/FilterList';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from 'q3-ui/lib/iconButton';
import Dialog from 'q3-ui-dialog';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import { red } from '@material-ui/core/colors';
import ChartDownload from '../ChartDownload';
import Figure from '../../components/Figure';

// eslint-disable-next-line
const ChartLoadingContainer = ({ children }) => (
  <Box
    display="flex"
    height="100%"
    width="100%"
    alignItems="center"
    justifyContent="center"
  >
    {children}
  </Box>
);

const Chart = ({
  initialQueryValue,
  chartComponent,
  filterComponent,
  ...FigureProps
}) => {
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState(
    initialQueryValue,
  );

  const uri = `/reports${query}`;

  const renderChartComponent = () => {
    if (error)
      return (
        <ChartLoadingContainer>
          <BrokenImageIcon
            style={{ color: red[900], fontSize: 26 }}
          />
        </ChartLoadingContainer>
      );

    if (loading)
      return (
        <ChartLoadingContainer>
          <CircularProgress />
        </ChartLoadingContainer>
      );
    return React.cloneElement(chartComponent, {
      data,
    });
  };

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(uri)
      .then((res) => setData(res.data.data))
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [uri]);

  return (
    <Figure
      {...FigureProps}
      captionComponent={
        <Dialog
          title="filter"
          renderContent={(close) => (
            <EncodedUrl
              query={query}
              onSave={(values) => {
                close();
                setQuery(values);
              }}
            >
              {filterComponent}
              <Grid item xs={12}>
                <Next submit />
              </Grid>
            </EncodedUrl>
          )}
          renderTrigger={(onClick) => (
            <Grid container>
              <Grid item>
                <IconButton
                  label="filter"
                  icon={FilterList}
                  buttonProps={{
                    onClick,
                  }}
                />
              </Grid>
              <Grid item>
                <ChartDownload uri={uri} />
              </Grid>
            </Grid>
          )}
        />
      }
    >
      {renderChartComponent()}
    </Figure>
  );
};

Chart.propTypes = {
  /**
   * Must begin with "?" and should contain at least one parameter for the template name.
   */
  initialQueryValue: PropTypes.string.isRequired,

  chartComponent: PropTypes.node.isRequired,
  filterComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
};

export default Chart;
