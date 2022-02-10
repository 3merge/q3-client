import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import axios from 'axios';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Button from '@material-ui/core/Button';
import FormBox from '../components/FormBox';
import FormBoxContent from '../components/FormBoxContent';
import FormBoxNotice from '../components/FormBoxNotice';
import { hasOp, toOp } from '../components/utils';
import withPublicTemplate from '../components/withPublicTemplate';

const Reverify = ({ location: { search, pathname } }) => {
  const { t } = useTranslation();

  if (hasOp(search))
    return (
      <FormBoxNotice
        title="reverified"
        description="reverified"
      >
        <Button
          component={Link}
          to="/reverify"
          variant="contained"
          color="secondary"
        >
          {t('labels:tryAgain')}
        </Button>
      </FormBoxNotice>
    );

  return (
    <FormBox
      renderBottom={
        <Form
          onSubmit={(body) =>
            axios
              .post('/reverify', body)
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
          title="reverify"
          description="reverify"
        />
      }
    />
  );
};

Reverify.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,
};

const ReverifyWithTemplate = withPublicTemplate(Reverify);
export default ReverifyWithTemplate;
