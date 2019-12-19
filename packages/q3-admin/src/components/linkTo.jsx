import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

const LinkTo = ({ destination }) => {
  const { t } = useTranslation('titles');
  return (
    <Button
      component={Link}
      to={`/${destination}`}
      style={{ float: 'right' }}
    >
      {t(destination)}
    </Button>
  );
};

LinkTo.propTypes = {
  destination: PropTypes.string.isRequired,
};

export default LinkTo;
