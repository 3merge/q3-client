import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/icons/PlaylistAdd';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { asOptions } from 'q3-ui-forms/lib/helpers';
import { StickyPopover } from '../stickyIconNavigator';

const ColumnConfigurator = ({
  id,
  allColumns,
  activeColumns,
  children,
}) => {
  const [inEffect, setInEffect] = React.useState([]);
  const getLocalStorageName = () =>
    `q3-datatables-column-${id}`;

  const updateActiveColumns = (v) => {
    if (id) localStorage.setItem(getLocalStorageName(), v);
    setInEffect(v);
  };

  React.useEffect(() => {
    const pref = localStorage.getItem(
      getLocalStorageName(),
    );

    if (pref) {
      setInEffect(pref.split(',').filter(Boolean));
    } else {
      setInEffect(activeColumns);
    }
  }, [id]);

  return children(
    () =>
      allColumns.length > 0 && (
        <StickyPopover
          id="column-configurator"
          label="activeColumns"
          icon={List}
        >
          <Form
            submitLabel="apply"
            initialValues={{ columns: inEffect }}
            onSubmit={({ columns }) =>
              updateActiveColumns(columns)
            }
          >
            <Field
              name="columns"
              options={asOptions(allColumns)}
              collapse={false}
              type="checkset"
            />
          </Form>
        </StickyPopover>
      ),
    inEffect,
  );
};

ColumnConfigurator.propTypes = {
  allColumns: PropTypes.arrayOf(PropTypes.string),
  activeColumns: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.func.isRequired,
};

ColumnConfigurator.defaultProps = {
  allColumns: [],
  activeColumns: [],
};

export default ColumnConfigurator;
