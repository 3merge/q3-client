import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import Button from '@material-ui/core/Button';
import CollapsibleFieldLabel from 'q3-ui/lib/collapsibleFieldLabel';
import useDecorator from '../../helpers/useDecorator';
import Bool from '../bool';

const isSet = (v) => v > 0;

const getVisibleResults = (arr, numberOfVisible) => {
  if (!Array.isArray(arr)) return [];
  return numberOfVisible > 0
    ? arr.slice(0, numberOfVisible)
    : arr;
};

export const ChecksetVisibilityThreshold = ({
  maxVisible,
  options,
  children,
}) => {
  const { t } = useTranslation('labels');

  const [
    visibleResults,
    setVisibleResults,
  ] = React.useState(maxVisible);

  const showAll = isSet(visibleResults);

  const handleVisibilityClick = () =>
    setVisibleResults(showAll ? 0 : maxVisible);

  return (
    <>
      {children(getVisibleResults(options, visibleResults))}
      {isSet(maxVisible) && (
        <Button
          type="button"
          onClick={handleVisibilityClick}
          id="toggle-visibility"
        >
          {showAll ? t('more') : t('less')}
        </Button>
      )}
    </>
  );
};

ChecksetVisibilityThreshold.propTypes = {
  maxVisible: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.func.isRequired,
};

ChecksetVisibilityThreshold.defaultProps = {
  maxVisible: 0,
};

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
      <ChecksetVisibilityThreshold
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
      </ChecksetVisibilityThreshold>
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
