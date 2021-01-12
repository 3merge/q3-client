import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import IconButton from 'q3-ui/lib/iconButton';
import Down from '@material-ui/icons/KeyboardArrowDown';
import Up from '@material-ui/icons/KeyboardArrowUp';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import LaunchIcon from '@material-ui/icons/Launch';
import classnames from 'classnames';
import EditorDrawer from '../EditorDrawer';
import DeleteModal from '../DeleteModal';
import Context from '../state';
import useStyle from '../useStyle';

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
    Context,
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
  linkTo,
  linkToLabel,
}) => {
  const { tableCell, tableActions } = useStyle();
  const data = parent[currentIndex];
  const { id } = data;

  return (
    <TableCell
      className={classnames(tableCell, tableActions)}
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
      {linkTo && (
        <IconButton
          label={linkToLabel}
          icon={LaunchIcon}
          buttonProps={{
            component: Link,
            to: linkTo,
          }}
        />
      )}
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
  linkTo: PropTypes.string,
  linkToLabel: PropTypes.string,
};

ItemActions.defaultProps = {
  showRemove: true,
  showEditor: true,
  nestedIsVisible: false,
  renderNestedTableRow: null,
  linkTo: null,
  linkToLabel: '',
};

export default ItemActions;
