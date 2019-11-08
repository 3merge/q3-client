import React from 'react';
import { Location, navigate } from '@reach/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tune from '@material-ui/icons/Tune';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import { useOpen } from '../toolbar';

export const withLocation = (Component) => (props) => (
  <Location>
    {({ location }) => {
      const params = new URLSearchParams(location.search);

      const update = (values) => {
        Object.entries(values).forEach(([k, v]) =>
          params.set(k, v),
        );

        navigate(`?${params.toString()}`);
        window.scrollTo(0, 0);
      };

      return (
        <Component
          {...props}
          locationParams={params}
          updateParams={update}
        />
      );
    }}
  </Location>
);

const Filter = ({
  render,
  total,
  initialValues,
  locationParams,
  onChange,
}) => {
  const { open, toggleMenu, closeMenu } = useOpen(true);
  const { t } = useTranslation();

  return (
    <>
      <IconButton
        disabled={!render}
        aria-label={t('labels:filter')}
        onClick={toggleMenu}
      >
        <Tune />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={closeMenu}
      >
        <Box p={2} width={280}>
          <Typography variant="h3" gutterBottom>
            {t('titles:filter')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t('descriptions:filter')}
          </Typography>

          <Formik
            enableReinitialize
            onChange={onChange}
            initialValues={initialValues}
            onSubmit={(values) => {
              Object.entries(values).forEach(([k, v]) =>
                locationParams.set(k, v),
              );

              navigate(`?${locationParams.toString()}`);
              window.scrollTo(0, 0);
              closeMenu();
            }}
          >
            {(formikBag) => (
              <Form>
                {render && render(formikBag)}
                <Badge badgeContent={total}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {t('labels:apply')}
                  </Button>
                </Badge>
              </Form>
            )}
          </Formik>
        </Box>
      </Drawer>
    </>
  );
};

export const FilterProps = {
  onChange: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  total: PropTypes.number,
  locationParams: PropTypes.shape({
    set: PropTypes.func,
    toString: PropTypes.func,
  }).isRequired,
};

Filter.propTypes = FilterProps;

Filter.defaultProps = {
  total: 0,
};

export default withLocation(Filter);
