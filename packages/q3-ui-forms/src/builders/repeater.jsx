import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import useOpen from 'useful-state/lib/useOpen';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

import IconEmpty from '../icons/empty';

const isObject = (item) => typeof item === 'object';

const assignIDs = (a) =>
  a.map((item, i) => {
    if (isObject(item) && !item.id) {
      return { ...item, id: i };
    }
    return item;
  });

const InteractiveListItem = ({
  id,
  icon,
  children,
  listNumber,
  ...etc
}) => (
  <>
    <ListItem disableGutters key={id} component="li" dense>
      <ListItemText {...etc} />
      <ListItemSecondaryAction>
        {children}
      </ListItemSecondaryAction>
    </ListItem>
    <Divider component="li" />
  </>
);

const DialogForm = ({ renderTrigger, renderContent }) => {
  const { isOpen, open, close } = useOpen();
  return (
    <>
      {renderTrigger(open)}
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={close}
        open={isOpen}
      >
        <DialogTitle>Name of Dialog</DialogTitle>
        <DialogContent>
          {renderContent(close)}
        </DialogContent>
      </Dialog>
    </>
  );
};

const DataList = ({ data, getForm, primary, secondary }) =>
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
          <DialogForm
            renderContent={getForm(false, item)}
            renderTrigger={(open) => (
              <IconButton onClick={open}>
                <FolderIcon />
              </IconButton>
            )}
          />
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </InteractiveListItem>
      ))}
    </List>
  ) : (
    <IconEmpty />
  );

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
  const getForm = (isNew = true, init = initialValues) => (
    done,
  ) =>
    React.cloneElement(children, {
      onReset: done,
      onSubmit: (...args) =>
        Promise.resolve(
          isNew ? create(...args) : edit(...args),
        ).finally(done),
      initialValues: init,
      collectionName,
      isNew,
    });

  return (
    <>
      <DataList
        getForm={getForm}
        data={assignIDs(data)}
        {...rest}
      />
      <Box mt={1}>
        <DialogForm
          renderContent={getForm()}
          renderTrigger={(open) => (
            <Button
              variant="contained"
              color="primary"
              onClick={open}
            >
              {data.length ? 'Add to list' : 'Start list'}
            </Button>
          )}
        />
      </Box>
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
};

Repeater.defaultProps = {
  data: [],
  collectionName: null,
  remove: null,
  edit: null,
  create: null,
};

export default Repeater;
