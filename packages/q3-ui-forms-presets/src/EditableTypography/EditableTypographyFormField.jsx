import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

export const executeCallbackAfterPromise = (
  onSave,
  done,
) => (values, actions) => {
  const fn = onSave(values, actions);
  if (fn && 'then' in fn)
    return fn.then((r) => {
      done();
      return r;
    });

  done();
  return fn;
};

const isCheckbox = (type) => type === 'checkbox';

const EditableTypographyFormField = ({
  onClose,
  onSave,
  fieldProps,
  initialValues,
}) => {
  const { t } = useTranslation('labels');
  const { name, type } = fieldProps;
  const check = isCheckbox(type);

  return (
    <Box p={1} pb={0} minWidth={230} maxWidth="90%">
      <Typography
        id="name"
        aria-label={name}
        variant="body2"
        color="primary"
        component="p"
        gutterBottom
      >
        <strong>{t(name)}</strong>
      </Typography>
      <Form
        enableSubmit={false}
        initialValues={initialValues}
        onSubmit={executeCallbackAfterPromise(
          onSave,
          onClose,
        )}
      >
        <Field
          autoFocus
          {...fieldProps}
          variant="standard"
          aria-labelledBy={`#${name}`}
          suppressLabel={!check}
          label={check ? 'enabled' : ''}
        />
        <Box
          display="flex"
          justifyContent="flex-end"
          mt={0.5}
        >
          <Button onClick={onClose} size="small">
            {t('cancel')}
          </Button>

          <Button
            type="submit"
            size="small"
            variant="contained"
            color="secondary"
            style={{ marginLeft: '0.5rem' }}
          >
            {t('apply')}
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

EditableTypographyFormField.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  fieldProps: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditableTypographyFormField;
