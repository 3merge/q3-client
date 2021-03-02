/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { useTranslation } from 'react-i18next';
import { Field } from '../../builders';
import RangeDelimiter, {
  generateSharedProps,
} from '../RangeDelimiter';
import { BuilderState } from '../../FormsContext';
import { makeRangeNames } from '../../helpers';

const DateRange = ({ name, ...rest }) => {
  const [from, to] = makeRangeNames(name);
  const { errors } = React.useContext(BuilderState);
  const { t } = useTranslation('labels');
  const shared = generateSharedProps(rest);

  return (
    <Grid item xs={12}>
      <RangeDelimiter
        icon={DateRangeIcon}
        leftRenderer={
          <Field
            {...shared}
            label={t('from')}
            error={get(errors, from)}
            helperText={get(errors, from) || t(name)}
            type="date"
            name={from}
            lg={6}
            xl={6}
          />
        }
        rightRenderer={
          <Field
            {...shared}
            label={t('to')}
            error={get(errors, to)}
            helperText={get(errors, to) || t(name)}
            icon={DateRangeIcon}
            type="date"
            name={to}
            lg={6}
            xl={6}
          />
        }
      />
    </Grid>
  );
};

DateRange.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DateRange;
