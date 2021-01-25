import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import { pick } from 'lodash';
import moment from 'moment';
import { EditableTypography } from 'q3-components';
import {
  castToBeginning,
  castToEnd,
} from 'q3-ui-forms/lib/helpers';

export default (Component) => {
  const DateRange = ({ dateRangeProp, ...rest }) => {
    const location = useLocation();
    const formKeyFrom = `${dateRangeProp}>`;
    const formKeyTo = `${dateRangeProp}<`;

    const [range, setRange] = React.useState({
      [formKeyFrom]: moment().subtract(3, 'month').toDate(),
      [formKeyTo]: moment().toDate(),
    });

    const addRangeToSearchLocation = () => {
      const params = new URLSearchParams(location?.search);
      params.set(
        formKeyFrom,
        castToBeginning(range[formKeyFrom]),
      );

      params.set(formKeyTo, castToEnd(range[formKeyTo]));
      return params.toString();
    };

    return (
      <Component
        {...rest}
        search={addRangeToSearchLocation()}
      >
        <EditableTypography
          debug
          onSubmit={(v) =>
            setRange(pick(v, Object.keys(range)))
          }
          initialValues={range}
          isEditable
          fieldProps={{
            label: 'Time range picker',
            name: dateRangeProp,
            type: 'dateRange',
          }}
        >
          {Object.values(range)
            .map((d) => moment(d).format('MMM DD, YYYY'))
            .join(' - ')}
        </EditableTypography>
      </Component>
    );
  };

  DateRange.defaultProps = {
    dateRangeProp: 'createdAt',
  };

  DateRange.propTypes = {
    dateRangeProp: PropTypes.string,
  };

  return DateRange;
};
