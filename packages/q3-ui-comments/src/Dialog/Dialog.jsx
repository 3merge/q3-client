import React from 'react';
import PropTypes from 'prop-types';
import { Builders } from 'q3-ui-forms';
import { useToggle } from 'useful-state';
import { makeStyles } from '@material-ui/core/styles';
import FieldMessage from '../FieldMessage';
import useDrafts from '../useDrafts';

const useStyle = makeStyles(() => ({
  root: {
    '& .q3-forms-rte-wrapper': {
      overflow: 'initial !important',
    },

    '& .cancel': {
      display: 'none !important',
    },
  },
}));

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
  label,
  onSubmit,
  ...rest
}) => {
  const { open, state, close } = useToggle();
  const { fieldId, remove } = useDrafts(rest);
  const cls = useStyle();

  const handleClose = (e) => {
    close(e);
    remove();
  };

  const handleOpen = () => {
    findAndClosePreviouslyOpenedEditors();
    open();
  };

  return state ? (
    <div className={cls.root} id="comments-rte">
      <Builders.Form
        {...rest}
        enableReset
        onReset={handleClose}
        onSubmit={(args) =>
          onSubmit(args).then(handleClose)
        }
        resetLabel="cancel"
        debug
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
};

TimelineDialog.propTypes = {
  additionalFields: PropTypes.node,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  renderTrigger: PropTypes.func.isRequired,
};

export default TimelineDialog;
