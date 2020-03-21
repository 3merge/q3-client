import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'q3-ui-permissions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Dialog from 'q3-ui-dialog';
import * as yup from 'yup';
import List, { ListItem, ActionBar } from 'q3-ui/lib/list';
import Form from './form';
import Field from './field';
import { assignIDs } from '../helpers';

export const DeleteListItem = ({ next }) => (
  <Dialog
    title="delete"
    description="delete"
    renderTrigger={(open) => (
      <IconButton
        aria-label="Click to delete"
        onClick={open}
      >
        <DeleteIcon />
      </IconButton>
    )}
    renderContent={(close) => (
      <Form
        initialValues={{ confirm: '' }}
        onSubmit={(values, actions) =>
          next()
            .then(() => {
              close();
              actions.resetForm();
            })
            .catch(() => null)
        }
      >
        <Field
          name="confirm"
          autoFocus
          type="text"
          validate={yup
            .string()
            .test(function matchString(v) {
              return v === 'DELETE';
            })}
        />
      </Form>
    )}
  />
);

DeleteListItem.propTypes = {
  next: PropTypes.func.isRequired,
};

const DataListItem = ({
  children,
  item,
  index,
  getForm,
  data,
  primary,
  secondary,
  ...etc
}) => {
  const initialProps = getForm(false, item, item.id);
  const [
    renderContentProps,
    setRenderContentProps,
  ] = React.useState(initialProps);
  const [currentIndex, setCurrentIndex] = React.useState(
    index,
  );

  const onExit = () => {
    setCurrentIndex(index);
    setRenderContentProps(initialProps);
  };

  const onPrev = () => {
    const nextIndex =
      (data.length + currentIndex - 1) % data.length;
    const nextItem = data[nextIndex];

    setRenderContentProps(
      getForm(false, nextItem, nextItem.id),
    );
    setCurrentIndex(nextIndex);
  };

  const onNext = () => {
    const nextIndex = (currentIndex + 1) % data.length;
    const nextItem = data[nextIndex];

    setRenderContentProps(
      getForm(false, nextItem, nextItem.id),
    );

    setCurrentIndex(nextIndex);
  };

  return (
    <ListItem
      key={index}
      title={primary(item)}
      description={secondary(item)}
    >
      <ActionBar>
        <Dialog
          {...etc}
          onPrev={onPrev}
          onNext={onNext}
          onExit={onExit}
          renderContent={() => renderContentProps}
          renderTrigger={(open) => (
            <IconButton onClick={open}>
              <EditIcon />
            </IconButton>
          )}
        />
        {children(item)}
      </ActionBar>
    </ListItem>
  );
};

export const DataList = ({ onCreate, data, ...etc }) => {
  return (
    <List onCreate={onCreate}>
      {data.map((item, i) => {
        return (
          <DataListItem
            index={i}
            item={item}
            data={data}
            {...etc}
          />
        );
      })}
    </List>
  );
};

DataList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  getForm: PropTypes.func.isRequired,
  primary: PropTypes.func.isRequired,
  secondary: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
};

DataList.defaultProps = {
  onCreate: null,
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
          // done();
        }),
      initialValues: init,
      collectionName,
      isNew,
    });

  return (
    <Dialog
      {...rest}
      renderContent={getForm()}
      renderTrigger={(open) => (
        <DataList
          getForm={getForm}
          data={assignIDs(data)}
          title={children.props.title}
          collectionName={collectionName}
          name={name}
          onCreate={
            auth.canCreateSub(name) || !collectionName
              ? open
              : null
          }
          {...rest}
        >
          {(item) =>
            (auth.canDeleteSub(name) || !collectionName) &&
            remove ? (
              <DeleteListItem next={remove(item.id)} />
            ) : null
          }
        </DataList>
      )}
    />
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
