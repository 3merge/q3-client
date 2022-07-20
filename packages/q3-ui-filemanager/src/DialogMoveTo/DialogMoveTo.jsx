import React from 'react';
import Dialog from 'q3-ui-dialog';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useTranslation } from 'q3-ui-locale';
import useDirectoryFolders from '../useDirectoryFolders';
import useDirectoryFoldersChange from '../useDirectoryFoldersChange';
import DialogTriggerButton from '../DialogTriggerButton';
import useDialog from '../useDialog';

const DialogMoveTo = () => {
  const root = '__ROOT__';
  const id = 'q3-file-dialog-move-to';

  const onChange = useDirectoryFoldersChange();
  const { tree = [] } = useDirectoryFolders();
  const { t } = useTranslation('labels');

  const { close, handleOpen, isOpen, TransitionProps } =
    useDialog(id);

  const [expanded, setExpanded] = React.useState([root]);
  const [selected, setSelected] = React.useState([root]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

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
        id={id}
        onClick={(e) => {
          handleOpen(e, open);
        }}
      />
    ),
    [],
  );

  return (
    <Dialog
      isOpen={isOpen}
      onClose={close}
      renderContent={() => (
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
              id: root,
              name: t('root'),
              children: tree,
            })}
          </TreeView>
          <Box mt={2}>
            <Button
              onClick={() =>
                onChange({
                  id: null,
                  folderId:
                    Array.isArray(selected) ||
                    selected === root
                      ? null
                      : selected,
                }).then(() => {
                  close();
                })
              }
              color="secondary"
              variant="contained"
            >
              {t('move')}
            </Button>
          </Box>
        </>
      )}
      renderTrigger={ButtonComponent}
      description="moveTo"
      title="moveTo"
      TransitionProps={TransitionProps}
    />
  );
};

DialogMoveTo.propTypes = {};

export default DialogMoveTo;
