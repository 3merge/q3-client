import React from 'react';
import PropTypes from 'prop-types';
import { set } from 'lodash';
import Dialog from 'q3-ui-dialog';
import IconButton from 'q3-ui/lib/iconButton';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import * as yup from 'yup';
import { useTranslation } from 'q3-ui-locale';

const FileListMake = ({ state, setState }) => {
  const { t } = useTranslation('descriptions');

  const handleSubmit =
    (done) =>
    ({ name }) => {
      const data = { ...state.data };
      set(data, name.toLowerCase(), {
        default: [],
      });

      setState({
        ...state,
        data,
      });

      done();
    };

  return (
    <Dialog
      title="createFolder"
      renderContent={(close) => (
        <Form onSubmit={handleSubmit(close)}>
          <Field
            name="name"
            type="text"
            xl={12}
            lg={12}
            required
            validate={yup.string().test(
              'is-unique',
              // eslint-disable-next-line
              t('descriptions:folderNameExists'),
              (value) =>
                !Object.keys(state.data).includes(value),
            )}
          />
        </Form>
      )}
      renderTrigger={(open) => (
        <IconButton
          label="createFolder"
          icon={CreateNewFolderIcon}
          buttonProps={{
            onClick: open,
          }}
        />
      )}
    />
  );
};

FileListMake.propTypes = {
  setState: PropTypes.func.isRequired,
  state: PropTypes.shape({
    data: PropTypes.shape({
      default: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
};

FileListMake.defaultProps = {
  state: {
    data: {
      default: [],
    },
  },
};

export default FileListMake;
