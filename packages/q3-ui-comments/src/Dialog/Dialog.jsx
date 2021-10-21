import React from 'react';
import PropTypes from 'prop-types';
import { Builders } from 'q3-ui-forms';
import { useToggle } from 'useful-state';
import { makeStyles } from '@material-ui/core/styles';
import FieldMessage from '../FieldMessage';

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
  const cls = useStyle();

  const handleOpen = () => {
    findAndClosePreviouslyOpenedEditors();
    open();
  };

  return state ? (
    <div className={cls.root} id="comments-rte">
      <Builders.Form
        {...rest}
        enableReset
        onReset={close}
        onSubmit={(args) => onSubmit(args).then(close)}
        resetLabel="cancel"
      >
        <FieldMessage {...rest} />
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
