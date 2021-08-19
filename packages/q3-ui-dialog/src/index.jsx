import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {
  IconButton,
  Box,
  Paper,
  Hidden,
} from '@material-ui/core';
import { get } from 'lodash';
import useOpen from 'useful-state/lib/useOpen';
import { withLocation } from 'with-location';
import DragIndicatorIcon from '@material-ui/icons/Games';
import DialogDraggable from './draggable';
import DialogHeader from './header';
import DialogFooter from './footer';
import DialogVariant from './variant';

export const DialogWrapper = ({
  draggable,
  title,
  description,
  renderTrigger,
  renderContent,
  renderHeader,
  renderPreContent,
  contentClassName,
  onNext,
  onPrev,
  initialValue,
  closeOnRouteChange,
  ...rest
}) => {
  const { isOpen, open, close } = useOpen(initialValue);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (closeOnRouteChange) close();
  }, [get(rest, 'location.pathname')]);

  return (
    <>
      {renderTrigger(open, isOpen)}
      <DialogVariant
        onOpen={open}
        onClose={close}
        isOpen={isOpen}
        PaperComponent={draggable ? DialogDraggable : Paper}
        {...rest}
      >
        {renderHeader ? (
          renderHeader({ open, close })
        ) : (
          <DialogHeader onClose={close} title={title}>
            {draggable && (
              <Hidden mdDown>
                <IconButton
                  style={{ cursor: 'move' }}
                  id="draggable-dialog-title"
                >
                  <DragIndicatorIcon />
                </IconButton>
              </Hidden>
            )}
          </DialogHeader>
        )}

        {renderPreContent}
        <DialogContent
          className={contentClassName}
          style={{
            overflowY:
              rest.variant === 'drawer'
                ? 'visible'
                : undefined,
          }}
        >
          <Box py={2}>
            {description && (
              <DialogContentText>
                {t(`descriptions:${description}`)}
              </DialogContentText>
            )}
            {renderContent(close)}
          </Box>
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
   * Will replace the dialog's header with a custom component.
   */
  renderHeader: PropTypes.node,

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
  onNext: PropTypes.func,

  /**
   * Function to execute on previous. Will not render without both onPrev and onNext.
   */
  onPrev: PropTypes.func,

  /**
   * Should the initial dialog state be open or close?
   */
  initialValue: PropTypes.bool,

  /**
   * Close the drawer if the page route changes.
   */
  closeOnRouteChange: PropTypes.bool,

  /**
   * Will enable react-draggable.
   */
  draggable: PropTypes.bool,
};

DialogWrapper.defaultProps = {
  description: null,
  contentClassName: null,
  className: null,
  renderPreContent: null,
  renderHeader: null,
  onNext: null,
  onPrev: null,
  initialValue: false,
  closeOnRouteChange: false,
  draggable: false,
};

export default withLocation(DialogWrapper);
