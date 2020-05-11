import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import CollapsibleFieldLabel from 'q3-ui/lib/collapsibleFieldLabel';
import useDecorator from '../../helpers/useDecorator';
import Bool from '../bool';
import OptionsThreshold from '../optionsThreshold';
import withGrid from '../withGrid';

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

export default withGrid(Checkset, {
  xl: 12,
  lg: 12,
});
