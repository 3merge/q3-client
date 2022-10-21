import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import * as FormPresets from 'q3-ui-forms/lib/presets';
import Dialog from 'q3-ui-dialog';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {
  compact,
  pick,
  map,
  get,
  uniq,
  filter,
  omit,
} from 'lodash';
import { connect } from '../../containers';
import ListFormatted from '../ListFormatted';
import Pattern from '../Pattern';

export const PatternFormDialogContent = connect(
  ({ data, fields, onClose, onSubmit, ...props }) => {
    const initialValues = React.useMemo(
      () =>
        pick(
          data,
          uniq(
            compact(
              map(fields, (item) =>
                // allows for extensions in cases like presets
                [item.field].concat(item.fieldReferences),
              ).flat(),
            ),
          ),
        ),
      [fields],
    );

    const FormFieldsRenderer = React.useMemo(
      () =>
        map(
          fields,
          ({
            field,
            preset,
            type = undefined,
            ...rest
          }) => {
            if (preset) {
              const Component = FormPresets[preset];
              if (Component)
                return (
                  <React.Fragment key={field}>
                    <Component
                      name={field}
                      xl={12}
                      lg={12}
                      {...rest}
                    />
                  </React.Fragment>
                );
            }

            return type ? (
              <Field
                {...omit(rest, ['formatter', 'formOnly'])}
                key={field}
                name={field}
                type={type}
                xl={12}
                lg={12}
              />
            ) : null;
          },
        ),
      [fields],
    );

    return (
      <Form
        initialValues={initialValues}
        onSubmit={(...params) =>
          onSubmit(...params).then((resp) => {
            onClose();
            return resp;
          })
        }
        {...get(props, 'FormProps', {})}
      >
        {FormFieldsRenderer}
      </Form>
    );
  },
);

export const PatternFormDialog = ({
  fields,
  size,
  ...props
}) => {
  const visibleFields = React.useMemo(
    () => filter(fields, (field) => !field.formOnly),
    [fields],
  );

  return (
    <Pattern
      {...props}
      size={size}
      action={
        <Dialog
          {...props}
          renderContent={(close) => (
            <PatternFormDialogContent
              fields={fields}
              onClose={close}
              {...props}
            />
          )}
          renderTrigger={(onClick) => (
            <IconButton
              onClick={onClick}
              color="inherit"
              size="small"
            >
              <EditIcon />
            </IconButton>
          )}
        />
      }
    >
      <ListFormatted fields={visibleFields} />
    </Pattern>
  );
};

PatternFormDialog.defaultProps = {
  size: 'sm',
};

PatternFormDialog.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
    }),
  ).isRequired,
  size: PropTypes.string,
};

export default PatternFormDialog;
