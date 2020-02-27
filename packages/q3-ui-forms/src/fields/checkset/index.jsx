import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import Button from '@material-ui/core/Button';
import CollapsibleFieldLabel from 'q3-ui/lib/collapsibleFieldLabel';
import useDecorator from '../../helpers/useDecorator';
import Bool from '../bool';
import OptionsThreshold from '../optionsThreshold';

const Checkset = ({ maxVisible, ...props }) => {
  const [{ value = [] }, { error }] = useField(props);
  const {
    onArrayPush,
    options,
    disabled,
    readOnly,
    ...rest
  } = useDecorator(props);

  return (
    <CollapsibleFieldLabel {...rest} error={Boolean(error)}>
      <OptionsThreshold
        maxVisible={maxVisible}
        options={options}
      >
        {(res = []) =>
          res.map((option) => (
            <Bool
              {...option}
              variant="checkbox"
              key={option.label}
              onChange={onArrayPush}
              isChecked={value.includes(option.value)}
              disabled={disabled}
              readOnly={readOnly}
            />
          ))
        }
      </OptionsThreshold>
    </CollapsibleFieldLabel>
  );
};

Checkset.propTypes = {
  /**
   * Will hide options exceeding this number in length.
   */
  maxVisible: PropTypes.number,
};

Checkset.defaultProps = {
  maxVisible: 0,
};

export default Checkset;
