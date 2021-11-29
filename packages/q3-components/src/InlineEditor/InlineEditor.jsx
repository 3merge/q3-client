import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Edit from '@material-ui/icons/Edit';
import IconButton from 'q3-ui/lib/iconButton';
import Box from '@material-ui/core/Box';
import { Form, Next } from 'q3-ui-forms/lib/builders';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Inline from '../Inline';

export const executeCallbackAfterPromise =
  (onSave, done) => (values, actions) => {
    const fn = onSave(values, actions);

    if (fn && 'then' in fn)
      return fn.then((r) => {
        done();
        return r;
      });

    done();
    return fn;
  };

export const InlineEditorFormContent = ({
  children,
  onSubmit,
  close,
  ...rest
}) => {
  const { t } = useTranslation('labels');

  return (
    <Form
      {...rest}
      marshalSelectively
      enableSubmit={false}
      onSubmit={executeCallbackAfterPromise(
        onSubmit,
        close,
      )}
    >
      {children}
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent="flex-end"
          mt={0.5}
        >
          <Button onClick={close} size="small">
            {t('cancel')}
          </Button>
          <Next submit>
            {(nextProps) => (
              <Button
                {...nextProps}
                size="small"
                variant="contained"
                color="secondary"
                style={{ marginLeft: '0.5rem' }}
              >
                {t('apply')}
              </Button>
            )}
          </Next>
        </Box>
      </Grid>
    </Form>
  );
};

InlineEditorFormContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

const InlineEditor = ({
  children,
  initialValues,
  buttonComponent,
  onSubmit,
  title,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <Inline
      title={t(`labels:${title}`)}
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
        <InlineEditorFormContent
          close={close}
          onSubmit={onSubmit}
          initialValues={initialValues}
          {...rest}
        >
          {children}
        </InlineEditorFormContent>
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
