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
  field,
  comment,
  ...rest
}) => {
  const { collectionName } = rest;
  const { id, createdBy, removed } = comment;
  const [options, setOptions] = React.useState([]);
  const { HideByField, canEditSub, state } =
    useAuth(collectionName);

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

  const addRemovedAction = (label, value) =>
    canEditSub('removed')
      ? [
          {
            label,
            onClick() {
              return patch(id)({
                removed: value,
                id, // only necessary for testing
              });
            },
          },
        ]
      : [];

  React.useEffect(() => {
    setOptions(
      removed
        ? addRemovedAction('restore', false).concat(
            addRef(del, 'delete'),
          )
        : addRef(edit, 'edit').concat(
            addRemovedAction('remove', true),
          ),
    );
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
            label={DELETE_LABEL}
            title="confirmDelete"
            description="confirmDelete"
            service={remove(id)}
            // eslint-disable-next-line
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

TimelineActions.defaultProps = {
  collectionName: undefined,
};

TimelineActions.propTypes = {
  collectionName: PropTypes.string,
  field: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  patch: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    // eslint-disable-next-line
    createdBy: PropTypes.object,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    removed: PropTypes.bool,
  }).isRequired,
};

export default TimelineActions;
