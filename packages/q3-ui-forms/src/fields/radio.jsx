import React from 'react';
import { useTranslation } from 'react-i18next';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import { CollapseableFieldset } from './checkset';
import useDecorator from '../helpers/useDecorator';

const Radioset = (props) => {
  const {
    label,
    helperText,
    error,
    options,
    ...rest
  } = useDecorator(props);
  const { t } = useTranslation('labels');

  return Array.isArray(options) && options.length ? (
    <CollapseableFieldset
      label={label}
      error={error}
      helperText={helperText}
    >
      <RadioGroup aria-label={label} {...rest}>
        {options.map((option) => (
          <FormControlLabel
            control={
              <Radio
                disabled={rest.disabled}
                readOnly={rest.readOnly}
              />
            }
            name={option.label}
            label={t(option.label)}
            key={option.value}
            value={option.value}
          />
        ))}
      </RadioGroup>
    </CollapseableFieldset>
  ) : null;
};

export default Radioset;
