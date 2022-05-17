import React from 'react';
import { invoke, map } from 'lodash';
import Files from 'react-butterfiles';
import TableActionsDropdown from '../TableActionsDropdown';

const TableActionsDropdownImports = (props) => {
  const ref = React.useRef();
  const [key, setKey] = React.useState(
    'datatable-importer',
  );

  const handleFileUpload = (data) => {
    const [f] = data;
    const formData = new FormData();
    formData.append('import', f.src.file);
    invoke(ref, 'current', formData);
    setKey(f?.id);
  };

  // accecpt EXCEL, JSON, CSS and PDF

  return (
    <Files
      key={key}
      maxSize="5mb"
      // accept={[
      //   'application/pdf',
      //   'text/css',
      //   'image/jpeg',
      // ]}
      multiple={false}
      onSuccess={handleFileUpload}
      onError={() => {
        // eslint-disable-next-line
        alert(t('uploadFailed.'));
      }}
    >
      {({ browseFiles }) => (
        <TableActionsDropdown
          {...props}
          // eslint-disable-next-line
          items={map(props?.items, (item) => ({
            ...item,
            onClick() {
              ref.current = item.onClick;
              browseFiles();
            },
            onClose() {
              ref.current = null;
            },
          }))}
        />
      )}
    </Files>
  );
};

export default TableActionsDropdownImports;
