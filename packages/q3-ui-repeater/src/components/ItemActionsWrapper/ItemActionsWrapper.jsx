import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import Pageview from '@material-ui/icons/Pageview';
import Dialog from 'q3-ui-dialog';
import { object } from 'q3-ui-helpers';
import { get } from 'lodash';
import Context from '../state';
import useNextPrev from '../useNextPrev';

const ItemActionsWrapper = ({
  children,
  icon: Icon,
  label,
  id,
}) => {
  const DOC_PARAM = 'selectedSubDocument';
  const ref = React.useRef();

  const { state } = useLocation();
  const { collectionName, edit } = React.useContext(
    Context,
  );

  const navigate = useNavigate();
  const activeId = get(state, DOC_PARAM, id);
  const { data, next, prev } = useNextPrev(activeId);

  const callNavigateWithId = (newId) =>
    navigate('', {
      state: {
        [DOC_PARAM]: newId,
      },
    });

  const renderContent = (close, isOpen) => {
    React.useEffect(() => {
      if (isOpen && !object.hasKeys(data)) close();
    }, [isOpen, data]);

    return children && isOpen
      ? React.cloneElement(children, {
          onSubmit: edit(activeId),
          initialValues: data || {},
          collectionName,
          close,
          id,
        })
      : null;
  };

  const renderTrigger = (toggle) => (
    <IconButton
      ref={ref}
      aria-label={label}
      className="q3-repeater-editor-button"
      onClick={toggle}
    >
      <Icon />
    </IconButton>
  );

  React.useEffect(() => {
    try {
      ref.current
        .closest('tr')
        .setAttribute('data-active-id', activeId);
    } catch (e) {
      // noop
    }
  }, [activeId]);

  return (
    <Dialog
      key={label}
      ModalProps={{
        disablePortal: true,
      }}
      onNext={() => callNavigateWithId(next())}
      onPrev={() => callNavigateWithId(prev())}
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      SlideProps={{
        onEnter: () => callNavigateWithId(id),
        onExited: () => navigate('?'),
      }}
      title={label}
      variant="drawer"
    />
  );
};

ItemActionsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
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
  icon: Pageview,
  label: 'editor',
};

export default ItemActionsWrapper;
