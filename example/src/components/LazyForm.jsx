import React from 'react';
import axios from 'axios';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { size, map, last } from 'lodash';
import { getSafelyForAutoCompleteWithProjection } from 'q3-ui-rest';

export default ({ collectionName, fields, ...rest }) => {
  const [defs, setDefs] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(
        `design-system?collectionName=${collectionName}&element=form&fields=${fields.join(
          ',',
        )}`,
      )
      .then(({ data: { system } }) => {
        setDefs(system);
      });
  }, []);

  if (!size(defs)) return 'LOADING';

  return (
    <Form
      {...rest}
      collectionName={collectionName}
      keep={fields}
      marshal={defs.reduce((acc, curr) => {
        if (curr.type === 'autocomplete') {
          acc[`${curr.name}.ref`] = `${curr.name}.value`;
        } else {
          acc[curr.name] = curr.name;
        }

        return acc;
      }, {})}
      translate={defs.reduce((acc, curr) => {
        if (curr.type === 'autocomplete') {
          acc[`${curr.name}.value`] = `${curr.name}.ref`;
          acc[`${curr.name}.label`] = `${curr.name}.${last(
            curr.endpoint,
          )}`;
        }

        return acc;
      }, {})}
    >
      {map(defs, (props) => {
        if (props.type === 'autocomplete') {
          props.loadOptions = getSafelyForAutoCompleteWithProjection(
            ...props.endpoint,
          );
        }

        return <Field key={props.name} {...props} />;
      })}
    </Form>
  );
};
