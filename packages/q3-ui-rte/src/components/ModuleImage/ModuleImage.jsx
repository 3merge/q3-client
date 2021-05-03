import React from 'react';
import Files from 'react-butterfiles';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import { first } from 'lodash';
import Quill from 'quill';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useTranslation } from 'react-i18next';
import Dialog from 'q3-ui-dialog';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';

const ServerError = () => {
  const { t } = useTranslation();

  return (
    <DialogContentText>
      {t('descriptions:mediaUploadFailed')}
    </DialogContentText>
  );
};

const ModuleImage = React.forwardRef(
  ({ buttonComponent, selection, upload }, ref) => (
    <Dialog
      title="error"
      renderContent={ServerError}
      renderTrigger={(open) => {
        const handleError = () =>
          open({
            target: {
              name: '',
            },
          });

        return (
          <Files
            maxSize="5mb"
            onError={handleError}
            onSuccess={(data) =>
              upload(first(data))
                .then((url) => {
                  ref.current.insertEmbed(
                    selection?.index,
                    'image',
                    url,
                  );

                  ref.current.setSelection(
                    selection?.index + 1,
                    Quill.sources.SILENT,
                  );
                })
                .catch(handleError)
            }
          >
            {({ browseFiles }) => {
              const Button = buttonComponent;
              return <Button onClick={browseFiles} />;
            }}
          </Files>
        );
      }}
    />
  ),
);

ModuleImage.propTypes = propTypes;

export default withCurrentSelection(ModuleImage, {
  icon: PermMediaIcon,
  label: 'image',
});
