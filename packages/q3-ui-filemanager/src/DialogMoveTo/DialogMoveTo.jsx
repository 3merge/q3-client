import React from 'react';
import Dialog from 'q3-ui-dialog';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useTranslation } from 'q3-ui-locale';
import useDirectoryFolders from '../useDirectoryFolders';
import DialogTriggerButton from '../DialogTriggerButton';
import useDialog from '../useDialog';
import { DIALOG_MOVE, DIRECTORY_ROOT } from '../constants';
import DialogMoveToButton from '../DialogMoveToButton';

const forwardNodeIds = (fn) => (event, nodeIds) => {
  fn(nodeIds);
};

const DialogMoveTo = () => {
  const { tree = [] } = useDirectoryFolders();
  const { t } = useTranslation('labels');

  const { close, handleOpen, isOpen, TransitionProps } =
    useDialog(DIALOG_MOVE);

  const [expanded, setExpanded] = React.useState([
    DIRECTORY_ROOT,
  ]);

  const [selected, setSelected] = React.useState([
    DIRECTORY_ROOT,
  ]);

  const handleToggle = forwardNodeIds(setExpanded);
  const handleSelect = forwardNodeIds(setSelected);

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const ButtonComponent = React.useCallback(
    (open) => (
      <DialogTriggerButton
        id={DIALOG_MOVE}
        onClick={(e) => {
          handleOpen(e, open);
        }}
      />
    ),
    [],
  );

  const ContentComponent = React.useCallback(
    () => (
      <>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={expanded}
          selected={selected}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
        >
          {renderTree({
            id: DIRECTORY_ROOT,
            name: t('root'),
            children: tree,
          })}
        </TreeView>
        <DialogMoveToButton selected={selected} />
      </>
    ),
    [expanded, selected],
  );

  return (
    <Dialog
      TransitionProps={TransitionProps}
      description="moveTo"
      isOpen={isOpen}
      onClose={close}
      renderContent={ContentComponent}
      renderTrigger={ButtonComponent}
      title="moveTo"
    />
  );
};

DialogMoveTo.propTypes = {};

export default DialogMoveTo;
