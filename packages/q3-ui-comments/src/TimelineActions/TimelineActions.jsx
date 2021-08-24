import React from 'react';
import PropTypes from 'prop-types';
import Confirm from 'q3-ui-confirm';
import { useAuth } from 'q3-ui-permissions';
import TimelineMenu from '../TimelineMenu';
import Dialog from '../Dialog';
import useStyle from '../Timeline/styles';

const DELETE_LABEL = 'delete';
const EDIT_LABEL = 'edit';

const TimelineActions = ({
  remove,
  patch,
  post,
  field,
  comment,
  ...rest
}) => {
  const { collectionName } = rest;
  const { id, createdBy } = comment;
  const [options, setOptions] = React.useState([]);
  const { state, HideByField } = useAuth(collectionName);
  const cls = useStyle();

  const edit = React.useRef();
  const del = React.useRef();

  const addRef = (r, label) =>
    r.current
      ? [
          {
            label,
            onClick() {
              r.current.click();
            },
          },
        ]
      : [];

  React.useEffect(() => {
    setOptions([
      ...addRef(edit, 'edit'),
      ...addRef(del, 'delete'),
    ]);
  }, []);

  return (
    createdBy?.id === state?.profile?.id && (
      <>
        <HideByField path={field} op="Update">
          <Dialog
            label={EDIT_LABEL}
            initialValues={comment}
            onSubmit={patch(id)}
            renderTrigger={(onClick) => (
              <button
                aria-label={EDIT_LABEL}
                className={cls.invisible}
                onClick={onClick}
                ref={edit}
                type="button"
              />
            )}
            {...rest}
          />
        </HideByField>
        <HideByField path={field} op="Delete">
          <Confirm
            phrase={DELETE_LABEL.toUpperCase()}
            label={DELETE_LABEL}
            service={remove(id)}
            ButtonComponent={(buttonProps) => (
              <button
                {...buttonProps}
                aria-label={DELETE_LABEL}
                className={cls.invisible}
                ref={del}
                type="button"
              />
            )}
          />
        </HideByField>
        <TimelineMenu options={options} />
      </>
    )
  );
};

TimelineActions.propTypes = {
  collectionName: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  patch: PropTypes.func.isRequired,
  post: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    // eslint-disable-next-line
    createdBy: PropTypes.object,
    id: PropTypes.string,
  }).isRequired,
};

export default TimelineActions;
