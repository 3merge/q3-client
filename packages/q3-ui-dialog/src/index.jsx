import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import DialogContentText from '@material-ui/core/DialogContentText';
import Container from '@material-ui/core/Container';
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
      {renderTrigger(open, isOpen)}
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={close}
        open={isOpen}
        className={className}
        PaperProps={{
          style: {
            height: '100%',
          },
        }}
        {...rest}
      >
        {title && (
          <AppBar
            position="static"
            elevation={3}
            color="inherit"
          >
            <Toolbar
              style={{
                justifyContent: 'space-between',
                padding: '1rem',
              }}
            >
              <Typography
                variant="h4"
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
          <Container maxWidth="md">
            {description && (
              <DialogContentText variant="body2">
                {t(`descriptions:${description}`)}
              </DialogContentText>
            )}
            {renderContent(close)}
          </Container>
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
