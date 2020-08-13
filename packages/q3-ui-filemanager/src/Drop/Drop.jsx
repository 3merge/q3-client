import React from 'react';
import PropTypes from 'prop-types';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { browser, array, object } from 'q3-ui-helpers';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import useStyles from './useStyle';

const DROPPER_ID = 'dropper';

const joinFilePaths = (a = []) => {
  const out = array
    .is(a)
    .filter(Boolean)
    .join('/')
    .replace(/\/+/g, '/');

  return out.startsWith('/') ? out.substr(1) : out;
};

export class AcceptedFileDecorator {
  constructor(files) {
    this.data = array.is(files);
  }

  set directory(name) {
    this.data.forEach((item) => {
      // eslint-disable-next-line
      item.relativePath = joinFilePaths([name, item.name]);
    });

    return this;
  }

  withErrors() {
    return this.data.map((item) => {
      // eslint-disable-next-line
      item.error = true;
      return item;
    });
  }
}

export const handleFocusStateOnDrag = (isDragActive) => {
  if (browser.isBrowserReady())
    object.invokeInSafely(
      document.getElementById(DROPPER_ID),
      isDragActive ? 'focus' : 'blur',
    );
};

const Drop = ({
  children,
  onDrop,
  previewComponent,
  root,
  ...rest
}) => {
  const { container, icon } = useStyles();
  const { t } = useTranslation('descriptions');

  const [pendingFiles, setPendingFiles] = React.useState(
    [],
  );

  const onDropHandler = React.useCallback(
    (acceptedFiles) => {
      const formData = new FormData();
      const fs = new AcceptedFileDecorator(acceptedFiles);

      const handleError = () =>
        setPendingFiles(fs.withErrors());

      fs.directory = root;

      setPendingFiles(fs.data);

      try {
        return onDrop(formData)
          .then(() => {
            setPendingFiles([]);
          })
          .catch(handleError);
      } catch (e) {
        // should only run if onDrop is undefined
        return handleError();
      }
    },
    [root],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop: onDropHandler,
    ...rest,
  });

  const getDropperHandlers = () => ({
    id: DROPPER_ID,
    className: container,
    ...getRootProps(),
  });

  React.useEffect(() => {
    handleFocusStateOnDrag(isDragActive);
  }, [isDragActive]);

  return (
    <>
      <div
        style={{ marginBottom: '1rem' }}
        {...getDropperHandlers()}
      >
        <input {...getInputProps()} />
        {previewComponent || (
          <>
            <AttachFileIcon className={icon} />
            {t('clickOrDrop')}{' '}
          </>
        )}
      </div>
      {children(pendingFiles)}
    </>
  );
};

Drop.defaultProps = {
  root: '',
};

Drop.propTypes = {
  children: PropTypes.func.isRequired,
  onDrop: PropTypes.instanceOf(Promise).isRequired,
  root: PropTypes.string,
};

export default Drop;
