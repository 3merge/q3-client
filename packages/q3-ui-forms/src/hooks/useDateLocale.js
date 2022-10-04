import React from 'react';
import { timezone } from 'q3-ui-locale';
import moment from 'moment';

const useDateLocale = (format, props) => {
  const { onChange, value } = props;

  React.useEffect(() => {
    if (moment(value, moment.ISO_8601).isValid()) {
      onChange({
        target: {
          value: timezone.toLocal(value, format) || null,
        },
      });
    }
  }, [value]);
};

export default useDateLocale;
