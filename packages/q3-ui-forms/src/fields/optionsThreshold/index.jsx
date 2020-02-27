import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const isSet = (v) => v > 0;

const getVisibleResults = (arr, numberOfVisible) => {
  if (!Array.isArray(arr)) return [];
  return numberOfVisible > 0
    ? arr.slice(0, numberOfVisible)
    : arr;
};

export const OptionsThreshold = ({
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

OptionsThreshold.propTypes = {
  maxVisible: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.func.isRequired,
};

OptionsThreshold.defaultProps = {
  maxVisible: 0,
};

export default OptionsThreshold;
