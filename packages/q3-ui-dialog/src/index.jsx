import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Box from '@material-ui/core/Box';
import useOpen from 'useful-state/lib/useOpen';
import DialogHeader from './header';
import DialogFooter from './footer';
import DialogVariant from './variant';

const DialogWrapper = ({
  title,
  description,
  renderTrigger,
  renderContent,
  renderPreContent,
  contentClassName,
  onNext,
  onPrev,
  ...rest
}) => {
  const { isOpen, open, close } = useOpen();
  const { t } = useTranslation();

  return (
    <>
      {renderTrigger(open, isOpen)}
      <DialogVariant
        onOpen={open}
        onClose={close}
        isOpen={isOpen}
        {...rest}
      >
        <DialogHeader onClose={close} title={title} />
        {renderPreContent}
        <DialogContent className={contentClassName}>
          {description && (
            <DialogContentText variant="body2">
              {t(`descriptions:${description}`)}
            </DialogContentText>
          )}
          <Box py={2}>{renderContent(close)}</Box>
        </DialogContent>
        <DialogFooter
          onNext={onNext}
          onPrev={onPrev}
          onClose={close}
        />
      </DialogVariant>
    </>
  );
};

DialogWrapper.propTypes = {
  /**
   * Modal title.
   */
  title: PropTypes.string.isRequired,

  /**
   * Modal body description.
   */
  description: PropTypes.string,

  /**
   * Rendering function for the open button.
   */
  renderTrigger: PropTypes.func.isRequired,

  /**
   * Node
   */
  renderPreContent: PropTypes.node,

  /**
   * Rendering function for the body.
   */
  renderContent: PropTypes.func.isRequired,

  /**
   * Class to forward into the dialog body.
   */
  contentClassName: PropTypes.string,

  /**
   * Class to forward into the dialog wrapper.
   */
  className: PropTypes.string,

  /**
   * Function to execute on next. Will not render without both onPrev and onNext.
   */
  onNext: PropTypes.func.isRequired,

  /**
   * Function to execute on previous. Will not render without both onPrev and onNext.
   */
  onPrev: PropTypes.func.isRequired,
};

DialogWrapper.defaultProps = {
  description: null,
  contentClassName: null,
  className: null,
  renderPreContent: null,
};

export default DialogWrapper;
