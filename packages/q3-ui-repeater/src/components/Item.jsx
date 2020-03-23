import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { get, invoke } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditorDrawer from './EditorDrawer';
import DeleteModal from './DeleteModal';
import useStyle from './useStyle';
import EditableTypography from './EditableTypography';
import withAttribute from './Attribute';
import RepeaterState from './state';

/**
 * Without an ID, we can't run the REST services
 * (abstracted as onRemove and onUpdate).
 */
export const execFn = (fn, data) =>
  typeof fn === 'function' &&
  typeof data === 'object' &&
  data !== null
    ? fn(data.id)
    : null;

const Item = ({
  parent,
  index,
  onRemove,
  onUpdate,
  children,
  cardProps,
  item,
}) => {
  const {
    collectionName,
    name,
    multiselect,
  } = React.useContext(RepeaterState);

  const [
    switchingScreens,
    setSwitchingScreens,
  ] = React.useState(false);
  const [editorState, setEditorState] = React.useState(
    null,
  );

  const attributes = get(cardProps, 'attributes', []);
  const color = invoke(cardProps, 'onColor', item);
  const description = invoke(cardProps, 'describe', item);
  const editable = get(cardProps, 'editable', []);

  const [currentIndex, setCurrentIndex] = React.useState(
    index,
  );

  const data = parent[currentIndex];
  const save = execFn(onUpdate, data);
  const title = get(cardProps, 'title');
  const selected = multiselect.isChecked(data.id);

  const { root, launchers } = useStyle({
    selected,
    color,
  });

  const ofLength = (num) => num % parent.length;
  const isIn = (prop) => editable.includes(prop);

  const editorProps = {
    /**
     * We must re-initialize the right item before leaving.
     */
    onExit: () => setCurrentIndex(index),

    /**
     * Return to first item after last.
     */
    onNext: () =>
      setCurrentIndex(ofLength(currentIndex + 1)),

    /**
     * Jump to last item after reaching the first.
     */
    onPrev: () =>
      setCurrentIndex(
        ofLength(parent.length + currentIndex - 1),
      ),
  };

  const Attribute = withAttribute({
    data: item,
    save,
  });

  React.useEffect(() => {
    setSwitchingScreens(true);

    setTimeout(() => {
      setEditorState(
        React.cloneElement(children, {
          onSubmit: execFn(onUpdate, data),
          initialValues: data,
          collectionName,
        }),
      );

      setSwitchingScreens(false);
    }, 250);
  }, [item, data, currentIndex]);

  return (
    <Box className={root}>
      <Grid container spacing={2}>
        <Grid item sm="auto" xs={2}>
          <Checkbox
            checked={selected}
            onClick={multiselect.onCheck(item.id)}
          />
        </Grid>
        <Grid item style={{ flex: 1 }}>
          <EditableTypography
            editable={isIn(title)}
            gutterBottom={Boolean(description)}
            style={{ fontWeight: '600' }}
            variant="h3"
            color="primary"
            save={save}
            name={title}
            data={item}
          >
            {get(item, title)}
          </EditableTypography>
          {description && (
            <Typography style={{ margin: 0 }}>
              {description}
            </Typography>
          )}
          {attributes.length > 0 && (
            <Box mt={2}>
              <Grid container spacing={1}>
                {attributes.map((attribute) => (
                  <Attribute
                    editable={isIn(attribute)}
                    name={attribute}
                    key={attribute}
                  />
                ))}
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>
      <Box className={launchers}>
        <EditorDrawer
          title={`${name}Editor`}
          {...editorProps}
        >
          {() =>
            switchingScreens ? (
              <CircularProgress />
            ) : (
              editorState
            )
          }
        </EditorDrawer>
        <DeleteModal next={execFn(onRemove, data)} />
      </Box>
    </Box>
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
    color: PropTypes.string,
  }).isRequired,
};

Item.defaultProps = {
  onRemove: null,
  onUpdate: null,
};

export default Item;
