import React from 'react';
import PropTypes from 'prop-types';
import { get, invoke } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditorDrawer from './EditorDrawer';
import DeleteModal from './DeleteModal';
import useStyle from './useStyle';
import EditableTypography from './EditableTypography';
import withAttribute from './Attribute';
import RepeaterState from './state';

//= ===============================================================================
// Helpers
//= ===============================================================================

export const execFn = (fn, data) =>
  typeof fn === 'function' &&
  typeof data === 'object' &&
  data !== null
    ? fn(data.id)
    : null;

export const paginate = (
  state,
  currentIndex,
  originalIndex,
  onNextIndex,
) => {
  const count = Array.isArray(state) ? state.length : 0;
  const getRemainderOf = (v) => v % count;

  return {
    onExit() {
      return onNextIndex(originalIndex);
    },

    onNext() {
      return onNextIndex(getRemainderOf(currentIndex + 1));
    },

    onPrev() {
      const withCount = count + currentIndex;
      return onNextIndex(getRemainderOf(withCount - 1));
    },
  };
};

export const interpretCardsProps = (
  cardProps = {},
  currentData = {},
) => ({
  attributes: get(cardProps, 'attributes', []),
  color: invoke(cardProps, 'onColor', currentData),
  description: invoke(cardProps, 'describe', currentData),
  isIn: (v) =>
    Object.entries(get(cardProps, 'editable', {}))
      .filter(([key]) => key === v)
      .reduce(
        (obj, [key, value]) =>
          Object.assign(obj, {
            name: key,
            ...value,
          }),
        {},
      ),
});

//= ===============================================================================
// Partial
//= ===============================================================================

const EditorViewer = ({
  children,
  initialValues,
  onSubmit,
  ...rest
}) => {
  const [
    switchingScreens,
    setSwitchingScreens,
  ] = React.useState(false);

  const [editorState, setEditorState] = React.useState(
    null,
  );

  React.useEffect(() => {
    setSwitchingScreens(true);

    // simulate data fetching
    // helps visually indicate a state change
    setTimeout(() => {
      setEditorState(
        React.cloneElement(children, {
          initialValues,
          onSubmit,
          ...rest,
        }),
      );

      setSwitchingScreens(false);
    }, 250);
  }, [initialValues]);

  return switchingScreens ? (
    <CircularProgress />
  ) : (
    editorState
  );
};

EditorViewer.propTypes = {
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

//= ===============================================================================
// Component
//= ===============================================================================

const Item = ({
  parent,
  index,
  onRemove,
  onUpdate,
  children,
  cardProps,
  showAttributes,
  item,
}) => {
  const {
    collectionName,
    name,
    multiselect,
  } = React.useContext(RepeaterState);

  const {
    attributes,
    color,
    description,
    isIn,
  } = interpretCardsProps(cardProps, item);

  const [currentIndex, setCurrentIndex] = React.useState(
    index,
  );

  const data = parent[currentIndex];
  const save = execFn(onUpdate, data);
  const title = get(cardProps, 'title');
  const selected = multiselect.isChecked(data.id);

  const { root, titleCls } = useStyle({
    selected,
    color,
  });

  const editorProps = paginate(
    parent,
    currentIndex,
    index,
    setCurrentIndex,
  );

  const Attribute = withAttribute({
    data: item,
    save,
  });

  const titleProps = {
    className: titleCls,
    component: 'h3',
    color: 'primary',
  };

  return (
    <TableRow>
      <TableCell>
        <Box p={1}>
          <Grid container spacing={1}>
            <Hidden mdDown>
              <Grid item style={{ marginTop: 6 }}>
                <Checkbox
                  checked={selected}
                  onClick={multiselect.onCheck(item.id)}
                />
              </Grid>
            </Hidden>
            <Grid item>
              {typeof title === 'function' ? (
                <Typography {...titleProps}>
                  {title(item)}
                </Typography>
              ) : (
                <EditableTypography
                  {...titleProps}
                  editable={isIn(title)}
                  save={save}
                  name={title}
                  data={item}
                >
                  {get(item, title)}
                </EditableTypography>
              )}
              {description && (
                <Typography>{description}</Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </TableCell>

      {showAttributes
        ? attributes.map((attribute, i) => (
            <TableCell>
              <Attribute
                isLast={i === attributes.length - 1}
                editable={isIn(attribute)}
                name={attribute}
                key={attribute}
              />
            </TableCell>
          ))
        : null}

      <TableCell>
        <EditorDrawer
          title={`${name}Editor`}
          {...editorProps}
        >
          {() => (
            <EditorViewer
              collectionName={collectionName}
              onSubmit={execFn(onUpdate, data)}
              initialValues={data}
            >
              {children}
            </EditorViewer>
          )}
        </EditorDrawer>
        <DeleteModal next={execFn(onRemove, data)} />
      </TableCell>
    </TableRow>
  );
};

Item.propTypes = {
  children: PropTypes.node.isRequired,
  parent: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func,
  onUpdate: PropTypes.func,
  cardProps: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
};

Item.defaultProps = {
  onRemove: null,
  onUpdate: null,
};

export default Item;
