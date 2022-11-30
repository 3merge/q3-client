import React from 'react';
import PropTypes from 'prop-types';
import { Builders } from 'q3-ui-forms';
import { useToggle } from 'useful-state';
import { get } from 'lodash';
import { browser } from 'q3-ui-helpers';
import FieldMessage from '../FieldMessage';
import useDrafts from '../useDrafts';
import useStyle from './styles';

const findAndClosePreviouslyOpenedEditors = () => {
  try {
    const el = document.getElementById('comments-rte');
    if (el) el.querySelector('.cancel').click();
  } catch (e) {
    // noop
  }
};

const TimelineDialog = ({
  additionalFields,
  renderTrigger,
  onSubmit,
  ...rest
}) => {
  const { open, state, close } = useToggle();
  const { fieldId, remove } = useDrafts(rest);
  const cls = useStyle();

  const handleClassNames = () => {
    const id = get(rest, 'initialValues.id', null);
    const className = 'opened';
    const node =
      id && browser.isBrowserReady()
        ? document.getElementById(`comment-${id}`)
        : null;

    if (node) {
      if (state) node.classList.add(className);
      else node.classList.remove(className);
    }
  };

  const handleClose = (e) => {
    close(e);
    remove();
  };

  const handleOpen = () => {
    findAndClosePreviouslyOpenedEditors();
    open();
  };

  React.useEffect(handleClassNames, [state]);

  return state ? (
    <div className={cls.root} id="comments-rte">
      <Builders.Form
        {...rest}
        enableReset
        onReset={handleClose}
        onSubmit={(args) =>
          // workaround from test props
          onSubmit
            ? onSubmit(args).then(handleClose)
            : Promise.resolve()
        }
        resetLabel="cancel"
      >
        <FieldMessage fieldId={fieldId} {...rest} />
        {additionalFields}
      </Builders.Form>
      <button
        aria-label="cancel"
        className="cancel"
        onClick={close}
        type="button"
      />
    </div>
  ) : (
    renderTrigger(handleOpen, state)
  );
};

TimelineDialog.defaultProps = {
  additionalFields: null,
  onSubmit: null,
};

TimelineDialog.propTypes = {
  additionalFields: PropTypes.node,
  onSubmit: PropTypes.func,
  renderTrigger: PropTypes.func.isRequired,
};

export default TimelineDialog;
