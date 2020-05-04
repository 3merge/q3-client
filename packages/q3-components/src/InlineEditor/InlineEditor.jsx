import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Edit from '@material-ui/icons/Edit';
import IconButton from 'q3-ui/lib/iconButton';
import Box from '@material-ui/core/Box';
import { Form } from 'q3-ui-forms/lib/builders';
import Button from '@material-ui/core/Button';
import Inline from '../Inline';

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

const InlineEditor = ({
  children,
  initialValues,
  buttonComponent,
  onSubmit,
  title,
}) => {
  const { t } = useTranslation();

  return (
    <Inline
      title={title}
      renderTrigger={(open, state) =>
        buttonComponent ? (
          buttonComponent(open, state)
        ) : (
          <IconButton
            icon={Edit}
            label="open"
            buttonProps={{ onClick: open }}
          />
        )
      }
      renderContent={(close) => (
        <Form
          enableSubmit={false}
          initialValues={initialValues}
          onSubmit={executeCallbackAfterPromise(
            onSubmit,
            close,
          )}
        >
          {children}
          <Box
            display="flex"
            justifyContent="flex-end"
            mt={0.5}
          >
            <Button onClick={close} size="small">
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
      )}
    />
  );
};

InlineEditor.propTypes = {
  buttonComponent: PropTypes.func,
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

InlineEditor.defaultProps = {
  buttonComponent: null,
};

export default InlineEditor;
