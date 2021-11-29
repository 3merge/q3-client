import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import { pick } from 'lodash';
import moment from 'moment';
import { url } from 'q3-ui-helpers';
import { EditableTypography } from 'q3-components';
import { useTranslation } from 'q3-ui-locale';
import {
  castToBeginning,
  castToEnd,
} from 'q3-ui-forms/lib/helpers';

const getToday = () => moment().toDate();

const getFriendlyDate = (d) =>
  moment(d).format('MMM DD, YYYY');

const getThreeMonthsAgo = () =>
  moment().subtract(3, 'month').toDate();

const getCaster = (index) =>
  index === 0 ? castToBeginning : castToEnd;

const makeRangeKeys = (key) => {
  const append = (v) => `${key}${v}`;
  return {
    gt: append('>'),
    lt: append('<'),
  };
};

export const addRangeToSearchString = (state, location) => {
  const params = new URLSearchParams(location?.search);
  const keys = Object.keys(state);

  Object.values(state)
    .sort((a, b) => a - b)
    .forEach((value, i) => {
      params.set(keys[i], getCaster(i)(value));
    });
  return url.toParamsString(params);
};

export const printDateRange = (range) =>
  Object.values(range)
    .map(getFriendlyDate)
    .sort()
    .filter(Boolean)
    .join(' - ');

export default (Component) => {
  const DateRange = ({ dateRangeProp, ...rest }) => {
    const { t } = useTranslation('labels');
    const { gt, lt } = makeRangeKeys(dateRangeProp);
    const [range, setRange] = React.useState({
      [gt]: getThreeMonthsAgo(),
      [lt]: getToday(),
    });

    const handleSubmit = (v) =>
      setRange(pick(v, Object.keys(range)));

    return (
      <Component
        {...rest}
        search={addRangeToSearchString(
          range,
          useLocation(),
        )}
      >
        <EditableTypography
          onSubmit={handleSubmit}
          initialValues={range}
          isEditable
          fieldProps={{
            label: t('timeDateRangePicker'),
            name: dateRangeProp,
            type: 'dateRange',
          }}
        >
          {printDateRange(range)}
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
