import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'q3-ui-permissions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Dialog from 'q3-ui-dialog';
import * as yup from 'yup';
import Grid from '@material-ui/core/Grid';
import List, { ListItem, ActionBar } from 'q3-ui/lib/list';
import Form from './form';
import Field from './field';
import { assignIDs } from '../helpers';
import PersistWatcher from './persistWatcher';

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

const Tbody = ({ index, children }) =>
  index === 0 ? (
    <Box component="tbody" borderTop="2px solid whitesmoke">
      {children}
    </Box>
  ) : (
    children
  );

const DataListItem = ({
  children,
  item,
  index,
  getForm,
  data,
  columns,
  ...etc
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(
    index,
  );

  const onExit = () => setCurrentIndex(index);

  const onPrev = () =>
    setCurrentIndex(
      (data.length + currentIndex - 1) % data.length,
    );

  const onNext = () =>
    setCurrentIndex((currentIndex + 1) % data.length);

  return (
    <>
      {index === 0 && (
        <Box component="thead">
          <Box component="tr">
            {Object.keys(columns(item)).map((value, i) => (
              <Box
                component="th"
                item
                key={`${value}-${i}`}
              >
                <Box style={{ color: 'lightgrey' }}>
                  {value}
                </Box>
              </Box>
            ))}
            <Box component="th" item />
          </Box>
        </Box>
      )}
      <Tbody index={index}>
        <Box component="tr">
          {Object.values(columns(item)).map((value, i) => (
            <Box component="td" item key={`${value}-${i}`}>
              <Box textAlign="left">
                {i === 0 ? (
                  <strong>{value || '--'}</strong>
                ) : (
                  value || '--'
                )}
              </Box>
            </Box>
          ))}
          <Box component="td" item>
            <Dialog
              {...etc}
              variant="drawer"
              onPrev={onPrev}
              onNext={onNext}
              onExit={onExit}
              renderPreContent={
                <PersistWatcher
                  filterById={data[currentIndex].id}
                />
              }
              renderContent={getForm(
                false,
                data[currentIndex],
                data[currentIndex].id,
              )}
              renderTrigger={(open) => (
                <IconButton onClick={open}>
                  <EditIcon />
                </IconButton>
              )}
            />

            {children(item)}
          </Box>
        </Box>
      </Tbody>
    </>
  );
};

export const DataList = ({ onCreate, data, ...etc }) => {
  return (
    <Box
      mx={-2}
      mb={-4}
      style={{ backgroundColor: '#FFF' }}
    >
      <Box
        component="table"
        width="100%"
        style={{
          borderCollapse: 'collapse',
          tableLayout: 'fixed',
          textAlign: 'left',
        }}
      >
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
      </Box>
    </Box>
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
  ) => (done) => {
    return React.cloneElement(children, {
      onReset: done,
      onSubmit: (...args) =>
        Promise.resolve(
          isNew ? create(...args) : edit(id)(...args),
        ).then(() => {
          if (isNew) done();
        }),
      initialValues: init,
      collectionName,
      isNew,
      name: 'editor',
      id,
    });
  };

  return (
    <Dialog
      {...rest}
      variant="drawer"
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
