import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link, navigate } from 'gatsby';
import axios from 'axios';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Button from '@material-ui/core/Button';
import FormBox from '../components/FormBox';
import FormBoxContent from '../components/FormBoxContent';
import FormBoxNotice from '../components/FormBoxNotice';

export const OP = '?op=success';
export const hasOp = (search) =>
  search && search.includes(OP);

export const toOp = (pathname) => () =>
  navigate(`${pathname}${OP}`);

const PasswordReset = ({
  location: { search, pathname },
}) => {
  const { t } = useTranslation();

  if (hasOp(search))
    return (
      <FormBoxNotice
        title="passwordResetNotice"
        description="passwordResetNotice"
      >
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
        >
          {t('labels:login')}
        </Button>
      </FormBoxNotice>
    );

  return (
    <FormBox
      renderBottom={
        <Form
          onSubmit={(body) =>
            axios
              .post('/password-reset', body)
              .then(toOp(pathname))
          }
        >
          <Field
            type="email"
            name="email"
            xl={12}
            lg={12}
            md={12}
            required
          />
        </Form>
      }
      renderTop={
        <FormBoxContent
          title="passwordReset"
          description="passwordReset"
        />
      }
    />
  );
};

PasswordReset.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,
};

export default PasswordReset;
