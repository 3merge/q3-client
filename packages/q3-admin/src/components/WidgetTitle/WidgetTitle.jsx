import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import useStyle from './styles';

const WidgetTitle = ({ text }) => {
  const { t } = useTranslation('titles');
  const cls = useStyle();

  return (
    <Typography
      className={cls.title}
      component="h3"
      variant="h6"
    >
      {t(text)}
    </Typography>
  );
};

WidgetTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default WidgetTitle;
