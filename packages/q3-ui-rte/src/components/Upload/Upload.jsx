import React from 'react';
import Files from 'react-butterfiles';
import { first } from 'lodash';
import Quill from 'quill';
import { useTranslation } from 'q3-ui-locale';
import useBlot from '../useBlot';

const Upload = React.forwardRef(
  (
    {
      accept,
      blot,
      buttonComponent,
      maxSize,
      onSuccess,
      selection,
      updateSelection,
      upload,
    },
    ref,
  ) => {
    useBlot(blot);

    const { t } = useTranslation('descriptions');
    const handleError = () =>
      // eslint-disable-next-line
      alert(t('mediaUploadFailed'));

    return (
      <Files
        maxSize={maxSize}
        accept={accept}
        onError={handleError}
        onSuccess={(data) => {
          const d = first(data);
          return upload(d)
            .then((url) => {
              const i = selection?.index || 0;
              onSuccess(url, d, i);

              if (updateSelection)
                ref.current.setSelection(
                  i + 1,
                  Quill.sources.SILENT,
                );
            })
            .catch(handleError);
        }}
      >
        {({ browseFiles }) => {
          const Button = buttonComponent;
          return <Button onClick={browseFiles} />;
        }}
      </Files>
    );
  },
);

export default Upload;
