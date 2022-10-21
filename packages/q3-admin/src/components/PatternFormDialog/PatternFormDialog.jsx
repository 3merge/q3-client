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

const PatternFormDialog = ({
  data,
  fields,
  onSubmit,
  size,
  ...props
}) => {
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
        ({ field, preset, type = undefined, ...rest }) => {
          if (preset) {
            const Component = FormPresets[preset];
            if (Component)
              return (
                <Component
                  key={field}
                  name={field}
                  xl={12}
                  lg={12}
                  {...rest}
                />
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
    <Pattern
      {...props}
      action={
        <Dialog
          {...props}
          renderContent={(close) => (
            <Form
              initialValues={initialValues}
              onSubmit={(...params) =>
                onSubmit(...params).then((resp) => {
                  close();
                  return resp;
                })
              }
              {...get(props, 'FormProps', {})}
            >
              {FormFieldsRenderer}
            </Form>
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
      size={size}
    >
      <ListFormatted
        fields={filter(fields, (field) => !field.formOnly)}
      />
    </Pattern>
  );
};

PatternFormDialog.defaultProps = {
  size: 'sm',
};

PatternFormDialog.propTypes = {
  data: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
    }),
  ).isRequired,
  size: PropTypes.string,
};

export default connect(PatternFormDialog);
