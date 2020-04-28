import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'q3-ui/lib/iconButton';
import Down from '@material-ui/icons/KeyboardArrowDown';
import Up from '@material-ui/icons/KeyboardArrowUp';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import EditorDrawer from './EditorDrawer';
import DeleteModal from './DeleteModal';
import RepeaterState from './state';
import useStyle from './useStyle';

//= ===============================================================================
// Helpers
//= ===============================================================================

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

//= ===============================================================================
// Partial
//= ===============================================================================

const EditorViewer = ({
  id,
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

  const { collectionName, edit } = React.useContext(
    RepeaterState,
  );

  React.useEffect(() => {
    setSwitchingScreens(true);

    // simulate data fetching
    // helps visually indicate a state change
    setTimeout(() => {
      setEditorState(
        React.cloneElement(children, {
          onSubmit: edit(id),
          initialValues,
          collectionName,
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
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

//= ===============================================================================
// Component
//= ===============================================================================

const ItemActions = ({
  parent,
  index,
  children,
  showEditor,
  showRemove,
  toggleNested,
  currentIndex,
  setCurrentIndex,
  nestedIsVisible,
  renderNestedTableRow,
}) => {
  const { tableCell } = useStyle();
  const data = parent[currentIndex];
  const { id } = data;

  return (
    <TableCell
      className={tableCell}
      style={{ textAlign: 'right' }}
    >
      {renderNestedTableRow && (
        <IconButton
          label="toggleInfo"
          icon={nestedIsVisible ? Up : Down}
          buttonProps={{
            onClick: toggleNested,
          }}
        />
      )}
      {showEditor && (
        <EditorDrawer
          {...paginate(
            parent,
            currentIndex,
            index,
            setCurrentIndex,
          )}
        >
          {() => (
            <EditorViewer initialValues={data} id={id}>
              {children}
            </EditorViewer>
          )}
        </EditorDrawer>
      )}
      {showRemove && <DeleteModal id={id} />}
    </TableCell>
  );
};

ItemActions.propTypes = {
  parent: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  toggleNested: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
  showEditor: PropTypes.bool,
  showRemove: PropTypes.bool,
  nestedIsVisible: PropTypes.bool,
  renderNestedTableRow: PropTypes.func,
};

ItemActions.defaultProps = {
  showRemove: true,
  showEditor: true,
  nestedIsVisible: false,
  renderNestedTableRow: null,
};

export default ItemActions;
