import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@material-ui/core';
import Pageview from '@material-ui/icons/Pageview';
import Dialog from 'q3-ui-dialog';
import { isNil } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import Context, { ActionContext } from '../state';
import useNextPrev from '../useNextPrev';

const ItemActionsWrapper = ({
  children,
  disableDialog,
  icon: Icon,
  label,
  id,
}) => {
  const ref = React.useRef();
  const { state, setState } =
    React.useContext(ActionContext);

  const { collectionName, edit } =
    React.useContext(Context);

  const { t } = useTranslation('labels');
  const { data, next, prev } = useNextPrev(state);
  const { data: row } = useNextPrev(id);

  const renderChildren = (args = {}) =>
    children && (!isNil(data) || disableDialog)
      ? React.cloneElement(children, {
          ...args,
          onSubmit: edit(state),
          initialValues: data || {},
          collectionName,
          row,
          id,
        })
      : null;

  const renderContent = (close, isOpen) =>
    isOpen &&
    renderChildren({
      close,
    });

  const renderTrigger = (toggle) => (
    <Tooltip arrow title={t(label)}>
      <IconButton
        ref={ref}
        aria-label={label}
        className="q3-repeater-editor-button"
        color="inherit"
        onClick={toggle}
      >
        <Icon />
      </IconButton>
    </Tooltip>
  );

  React.useEffect(() => {
    try {
      ref.current
        .closest('tr')
        .setAttribute('data-active-id', state);
    } catch (e) {
      // noop
    }
  }, [state]);

  const DialogRenderer = React.useMemo(
    () => (
      <Dialog
        ModalProps={{
          disablePortal: true,
        }}
        SlideProps={{
          onEnter: () => setState(id),
          onExited: () => setState(null),
        }}
        key={label}
        onNext={() => setState(next())}
        onPrev={() => setState(prev())}
        renderContent={renderContent}
        renderTrigger={renderTrigger}
        title={label}
        variant="drawer"
      />
    ),
    [id, data],
  );

  return disableDialog ? renderChildren() : DialogRenderer;
};

ItemActionsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  disableDialog: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
  ]),
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.string,
};

ItemActionsWrapper.defaultProps = {
  disableDialog: false,
  icon: Pageview,
  label: 'editor',
};

export default ItemActionsWrapper;
