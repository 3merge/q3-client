import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import DialogContentText from '@material-ui/core/DialogContentText';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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
  const { t } = useTranslation();

  return (
    <>
      {renderTrigger(open)}
      <Dialog
        fullWidth
        fullScreen
        onClose={close}
        open={isOpen}
        className={className}
        {...rest}
      >
        {title && (
          <AppBar
            position="static"
            elevation={3}
            color="inherit"
          >
            <Toolbar
              style={{ justifyContent: 'space-between' }}
            >
              <Typography
                variant="h3"
                color="inherit"
                component="h3"
              >
                {t(`titles:${title}`)}
              </Typography>
              <IconButton
                onClick={close}
                aria-label={t('labels:close')}
                color="inherit"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        )}
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
