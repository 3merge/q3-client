import React from 'react';
import PropTypes from 'prop-types';
import { red, blue } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';

const TimelineCode = ({ label, value }) => {
  const { t } = useTranslation('labels');
  const color = label === 'unset' ? red : blue;

  return (
    <div>
      <code>
        <span
          style={{
            color: color[900],
          }}
        >
          {t(label)}
        </span>{' '}
        {value}
      </code>
    </div>
  );
};

TimelineCode.defaultProps = {
  label: 'unset',
  value: '',
};

TimelineCode.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

export default TimelineCode;
