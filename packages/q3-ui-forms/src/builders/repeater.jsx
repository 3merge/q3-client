import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'q3-ui-permissions';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import useValue from 'useful-state/lib/useValue';
import Dialog from 'q3-ui-dialog';
import { assignIDs } from '../helpers';
import IconEmpty from '../icons/empty';

export const InteractiveListItem = ({
  children,
  ...etc
}) => (
  <>
    <ListItem disableGutters component="li" dense>
      <ListItemText {...etc} />
      <ListItemSecondaryAction>
        {children}
      </ListItemSecondaryAction>
    </ListItem>
    <Divider component="li" />
  </>
);

InteractiveListItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const DeleteListItem = ({ next }) => {
  const [hasError, setError] = React.useState(false);
  const { value, onChange, setValue } = useValue();
  const { t } = useTranslation();

  const submit = React.useCallback(
    (fn) => () =>
      value === 'DELETE'
        ? next()
            .then(() => {
              fn();
              setValue('');
            })
            .catch(() => null)
        : setError(true),
    [value],
  );

  return (
    <Dialog
      title="delete"
      description="delete"
      renderTrigger={(open) => (
        <IconButton onClick={open}>
          <DeleteIcon />
        </IconButton>
      )}
      renderContent={(close) => (
        <>
          <TextField
            variant="filled"
            value={value}
            onChange={onChange}
            label={t('descriptions:deleteConfirmation')}
            margin="dense"
            fullWidth
            autoFocus
            name="confirm"
            type="text"
            error={hasError}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <DialogActions>
            <Button type="button" onClick={close}>
              {t('labels:nevermind')}
            </Button>
            <Button type="button" onClick={submit(close)}>
              {t('labels:continue')}
            </Button>
          </DialogActions>
        </>
      )}
    />
  );
};

DeleteListItem.propTypes = {
  next: PropTypes.func.isRequired,
};

export const DataList = ({
  data,
  getForm,
  primary,
  secondary,
  children,
  ...etc
}) =>
  data.length ? (
    <List>
      {data.map((item, i) => (
        <InteractiveListItem
          {...item}
          key={item.i}
          listNumber={i}
          primary={primary(item)}
          secondary={secondary(item)}
        >
          <Dialog
            {...etc}
            renderContent={getForm(false, item, item.id)}
            renderTrigger={(open) => (
              <IconButton onClick={open}>
                <FolderIcon />
              </IconButton>
            )}
          />

          {children ? children(item) : null}
        </InteractiveListItem>
      ))}
    </List>
  ) : (
    <IconEmpty />
  );

DataList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  getForm: PropTypes.func.isRequired,
  primary: PropTypes.func.isRequired,
  secondary: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

const Repeater = ({
  data,
  name,
  edit,
  create,
  remove,
  children,
  initialValues,
  collectionName,
  ...rest
}) => {
  const { t } = useTranslation('labels');
  const auth = useAuth(collectionName);

  const getForm = (
    isNew = true,
    init = initialValues,
    id,
  ) => (done) =>
    React.cloneElement(children, {
      onReset: done,
      onSubmit: (...args) =>
        Promise.resolve(
          isNew ? create(...args) : edit(id)(...args),
        ).then(() => {
          done();
        }),
      initialValues: init,
      collectionName,
      isNew,
    });

  return (
    <>
      <DataList
        getForm={getForm}
        data={assignIDs(data)}
        title={children.props.title}
        collectionName={collectionName}
        name={name}
        {...rest}
      >
        {(item) =>
          auth.canDeleteSub(name) && remove ? (
            <DeleteListItem next={remove(item.id)} />
          ) : null
        }
      </DataList>

      {auth.canCreateSub(name) && (
        <Box mt={1}>
          <Dialog
            title={children.props.title}
            renderContent={getForm()}
            renderTrigger={(open) => (
              <Button
                variant="contained"
                color="primary"
                onClick={open}
              >
                {data.length
                  ? t('addToList')
                  : t('startList')}
              </Button>
            )}
          />
        </Box>
      )}
    </>
  );
};

Repeater.propTypes = {
  collectionName: PropTypes.string,
  name: PropTypes.string.isRequired,
  primary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  secondary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  remove: PropTypes.func,
  edit: PropTypes.func,
  create: PropTypes.func,
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
};

Repeater.defaultProps = {
  data: [],
  collectionName: null,
  remove: null,
  edit: null,
  create: null,
};

export default Repeater;
