import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Form } from 'q3-ui-forms/lib/builders';
import { withLocation } from 'with-location';
import { url } from 'q3-ui-helpers';
import {
  marshalFormFieldsIntoUrlString,
  appendEmptyValues,
  findByRegex,
} from './components/utils';

export const handleClear = ({
  values = {},
  state = {},
  remove,
  done,
}) => () => {
  Object.keys(values)
    .map((key) => {
      const i = findByRegex(Object.keys(state), key);
      return i !== -1 ? Object.keys(state)[i] : key;
    })
    .forEach((key) => remove(url.decode(key)));

  done();
};

export const FilterForm = ({
  next,
  clearLabel,
  children,
  params,
  pushTo,
  getAll,
  redirect,
  autosave,
  applyLabel,
  location,
  conversionMap,
  initialValues,
  ...rest
}) => {
  const currentState = getAll();
  const remove = params.delete.bind(params);
  const [init, setInitialValues] = React.useState(
    initialValues,
  );

  const apply = (values, actions) => {
    try {
      const v = marshalFormFieldsIntoUrlString(
        values,
        conversionMap,
        {
          remove,
        },
      );

      params.merge(v);
      console.log(params.toString());
      // pushTo(params);
      actions.resetForm(initialValues);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    setInitialValues(
      merge(initialValues, appendEmptyValues(currentState)),
    );
  }, [location]);

  return (
    <Form
      {...rest}
      debug
      labelSubmit="apply"
      initialValues={init}
      onSubmit={apply}
    >
      {children}
      <Box mt={1}>
        <Button
          size="large"
          variant="contained"
          onClick={handleClear({
            remove,
            // values,
            state: currentState,

            done: () => {
              //  resetForm();
              redirect();
            },
          })}
        >
          {clearLabel}
        </Button>
      </Box>
    </Form>
  );
};

FilterForm.propTypes = {
  /**
   * Most probably the fields available in ./components
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,

  /**
   * Handle location changes.
   */
  next: PropTypes.func.isRequired,

  /**
   * Text label for the reset button.
   */
  clearLabel: PropTypes.string,

  /**
   * Text label for the apply button.
   */
  applyLabel: PropTypes.string,

  /**
   * Injected from with-location lib.
   */
  getAll: PropTypes.func.isRequired,

  /**
   * Injected from with-location lib.
   */
  pushTo: PropTypes.func.isRequired,

  /**
   * Injected from with-location lib.
   */
  redirect: PropTypes.func.isRequired,

  /**
   * When enabled, it will automatically redirect on state change.
   */
  autosave: PropTypes.bool,
  /**
   * Injected from with-location lib.
   */
  params: PropTypes.shape({
    toString: PropTypes.func,
    delete: PropTypes.func,
    redirect: PropTypes.func,
  }).isRequired,
};

FilterForm.defaultProps = {
  clearLabel: 'Clear',
  applyLabel: 'Apply',
  autosave: false,
};

export default withLocation(FilterForm);
