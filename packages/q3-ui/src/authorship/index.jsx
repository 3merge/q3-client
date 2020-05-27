import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cite: {
    fontSize: '0.733rem',
    '&::before': {
      content: '"\\2014"',
    },
  },
}));

const Authorship = ({ author, date }) => {
  const { t } = useTranslation('labels');
  const { cite } = useStyles();

  return (
    <Box
      component="cite"
      display="block"
      className={cite}
      my={0.5}
      ml={2}
    >
      {`${author} ${t('on')} ${moment
        .utc(date)
        .local()
        .format('MMM DD, YYYY')}`}
    </Box>
  );
};

Authorship.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
};

Authorship.defaultProps = {
  date: new Date().toISOString(),
  author: 'Sys',
};

export default Authorship;
