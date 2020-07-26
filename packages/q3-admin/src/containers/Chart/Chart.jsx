import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { EncodedUrl } from 'q3-ui-forms/lib/adapters';
import { Next } from 'q3-ui-forms/lib/builders';
import FilterList from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid';
import IconButton from 'q3-ui/lib/iconButton';
import Dialog from 'q3-ui-dialog';
import { browser } from 'q3-ui-helpers';
import moment from 'moment';
import ChartDownload from '../ChartDownload';
import Figure from '../../components/Figure';

const getDate = (s, key) => {
  if (!browser.isBrowserReady()) return 'N/A';
  return moment(new URLSearchParams(s).get(key)).format(
    'MMMM DD',
  );
};

const Chart = ({
  initialQueryValue,
  chartComponent,
  filterComponent,
  from,
  to,
  ...FigureProps
}) => {
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState(
    initialQueryValue,
  );

  const uri = `/reports${query}`;

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

  if (error) {
    // eslint-disable-next-line
    console.error(error);
    return null;
  }

  return (
    <Figure
      {...FigureProps}
      captionComponent={
        <Dialog
          title="filter"
          renderContent={(close) =>
            React.cloneElement(filterComponent, {
              query,
              onSave: (values) => {
                close();
                setQuery(values);
              },
              onReset: () => {
                close();
                setQuery(initialQueryValue);
              },
            })
          }
          renderTrigger={(onClick) => (
            <Grid container alignItems="center">
              <Grid item>
                <small style={{ marginRight: '1rem' }}>
                  {[
                    getDate(query, from),
                    getDate(query, to),
                  ].join(' to ')}
                </small>
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
      {React.cloneElement(chartComponent, {
        loading,
        data,
      })}
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

  from: PropTypes.string,
  to: PropTypes.string,
};

Chart.defaultProps = {
  from: 'createdAt>',
  to: 'createdAt<',
};

export default Chart;
