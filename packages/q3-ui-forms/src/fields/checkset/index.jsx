import React from 'react';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import CollapsibleFieldLabel from 'q3-ui/lib/collapsibleFieldLabel';
import useDecorator from '../../helpers/useDecorator';
import Bool from '../bool';

const Checkset = (props) => {
  const [{ value = [] }, { error }] = useField(props);
  const {
    onArrayPush,
    options,
    disabled,
    readOnly,
    ...rest
  } = useDecorator(props);

  const { t } = useTranslation('labels');

  return Array.isArray(options) && options.length ? (
    <CollapsibleFieldLabel {...rest} error={Boolean(error)}>
      {options.map((option) => (
        <Bool
          variant="checkbox"
          key={option.label}
          label={t(option.label)}
          value={option.value}
          onChange={onArrayPush}
          isChecked={value.includes(option.value)}
          disabled={disabled}
          readOnly={readOnly}
        />
      ))}
    </CollapsibleFieldLabel>
  ) : null;
};

export default Checkset;
