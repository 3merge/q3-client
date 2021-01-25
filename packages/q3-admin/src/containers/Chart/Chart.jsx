import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import axios from 'axios';
import { capitalize } from 'lodash';
import * as Charts from 'q3-ui-charts';
import {
  Collapse,
  Box,
  LinearProgress,
} from '@material-ui/core';
import moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import { EditableTypography } from 'q3-components';

const Chart = ({
  component,
  dateRangeProp,
  template,
  ...rest
}) => {
  const ChartComponent = Charts[capitalize(component)];
  const [data, setData] = React.useState();

  const [error, setError] = React.useState();
  const location = useLocation();
  const theme = useTheme();

  const [range, setRange] = React.useState({
    from: moment().subtract(3, 'month').toDate(),
    to: moment().toDate(),
  });

  const formKeyFrom = `${dateRangeProp}>`;
  const formKeyTo = `${dateRangeProp}<`;

  React.useEffect(() => {
    const params = new URLSearchParams(location?.search);
    params.set('template', template);
    params.set(formKeyFrom, range.from);
    params.set(formKeyTo, range.from);

    axios
      .get(`/reports?${params.toString()}`)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setError(true);
      });
  }, [location?.search, range]);

  return ChartComponent && !error ? (
    <Box component="figure">
      <ChartComponent
        {...rest}
        {...data}
        hex={String(theme?.palette?.primary?.main).replace(
          '#',
          '',
        )}
      >
        <Box mr={1}>
          <EditableTypography
            isEditable
            fieldProps={{
              name: dateRangeProp,
              type: 'dateRange',
            }}
            initialValues={{
              [formKeyFrom]: range.from,
              [formKeyTo]: range.to,
            }}
            onSubmit={(values) =>
              setRange({
                from: values[formKeyFrom],
                to: values[formKeyTo],
              })
            }
          >
            <small style={{ marginRight: '1rem' }}>
              {[
                moment(range.from).format('MMM DD, YYYY'),
                moment(range.to).format('MMM DD, YYYY'),
              ].join(' - ')}
            </small>
          </EditableTypography>
        </Box>
      </ChartComponent>
    </Box>
  ) : null;
};

Chart.propTypes = {
  component: PropTypes.string.isRequired,
  template: PropTypes.string.isRequired,
  dateRangeProp: PropTypes.string,
};

Chart.defaultProps = {
  dateRangeProp: 'createdAt',
};

export default Chart;
