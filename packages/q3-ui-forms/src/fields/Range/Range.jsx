import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { omit } from 'lodash';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import { useTranslation } from 'react-i18next';
import RangeDelimiter from '../RangeDelimiter';
import Field from '../../builders/Field';
import { makeRangeNames } from '../../helpers';

export const Range = ({ name, ...props }) => {
  const [from, to] = makeRangeNames(name);
  const { t } = useTranslation('labels');
  const shared = omit(props, [
    'onChange',
    'onArrayPush',
    'onArrayPull',
    'name',
    'label',
    'id',
  ]);

  return (
    <Grid item xs={12}>
      <RangeDelimiter
        icon={LinearScaleIcon}
        leftRenderer={
          <Field
            {...shared}
            name={from}
            label="From"
            type="number"
            helperText={t(props.label)}
            lg={6}
            xl={6}
          />
        }
        rightRenderer={
          <Field
            {...shared}
            name={to}
            label="to"
            type="number"
            helperText={t(props.label)}
            icon={LinearScaleIcon}
            lg={6}
            xl={6}
          />
        }
      />
    </Grid>
  );
};

Range.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Range;
