import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const isSet = (v) => v > 0;

export const expandOptions = (a) =>
  a.some((item) => typeof item === 'object')
    ? a
    : a.map((value) => ({
        label: value,
        value,
      }));

const getVisibleResults = (arr, numberOfVisible) => {
  if (!Array.isArray(arr)) return [];

  const out =
    numberOfVisible > 0
      ? arr.slice(0, numberOfVisible)
      : arr;

  return expandOptions(out);
};

export const OptionsThreshold = ({
  maxVisible,
  options,
  children,
}) => {
  const { t } = useTranslation('labels');

  const [visibleResults, setVisibleResults] =
    React.useState(maxVisible);

  const showAll = isSet(visibleResults);

  const handleVisibilityClick = () =>
    setVisibleResults(showAll ? 0 : maxVisible);

  const items = getVisibleResults(options, visibleResults);

  return (
    <>
      {children(items)}
      {isSet(maxVisible) && (
        <Box mt={0.5}>
          <Button
            type="button"
            onClick={handleVisibilityClick}
            id="toggle-visibility"
          >
            {showAll ? t('more') : t('less')}
          </Button>
        </Box>
      )}
    </>
  );
};

OptionsThreshold.propTypes = {
  maxVisible: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.string,
    ]),
  ).isRequired,
  children: PropTypes.func.isRequired,
};

OptionsThreshold.defaultProps = {
  maxVisible: 0,
};

export default OptionsThreshold;
