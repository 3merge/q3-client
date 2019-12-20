import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useOpen from 'useful-state/lib/useOpen';

const DialogWrapper = ({
  title,
  description,
  renderTrigger,
  renderContent,
  contentClassName,
  className,
  ...rest
}) => {
  const { isOpen, open, close } = useOpen();
  const { t } = useTranslation('titles');

  return (
    <>
      {renderTrigger(open)}
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={close}
        open={isOpen}
        className={className}
        {...rest}
      >
        {title && <DialogTitle>{t(title)}</DialogTitle>}
        <DialogContent className={contentClassName}>
          {description && (
            <DialogContentText>
              {t(`descriptions:${description}`)}
            </DialogContentText>
          )}
          {renderContent(close)}
        </DialogContent>
      </Dialog>
    </>
  );
};

DialogWrapper.propTypes = {
  renderTrigger: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  contentClassName: PropTypes.string,
  className: PropTypes.string,
};

DialogWrapper.defaultProps = {
  title: null,
  description: null,
  contentClassName: null,
  className: null,
};

export default DialogWrapper;
