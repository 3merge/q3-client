import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';
import FormBoxNotice from './FormBoxNotice';
import { hasOp, toOp } from './utils';

const withSuccessOp = (Component, msg) => {
  const SuccessOpMessage = (props) => {
    const {
      location: { search, pathname },
    } = props;

    const { t } = useTranslation();

    return hasOp(search) ? (
      <FormBoxNotice title={msg} description={msg}>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
        >
          {t('labels:login')}
        </Button>
      </FormBoxNotice>
    ) : (
      <Component {...props} onSuccess={toOp(pathname)} />
    );
  };

  SuccessOpMessage.propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string,
      pathname: PropTypes.string,
    }).isRequired,
  };

  return SuccessOpMessage;
};

export default withSuccessOp;
