import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import Button from '@material-ui/core/Button';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useTranslation } from 'q3-ui-locale';
import { map } from 'lodash';
import useDirectoryFolders from '../useDirectoryFolders';
import useDirectoryFoldersChange from '../useDirectoryFoldersChange';

const DialogMoveTo = ({ children }) => {
  const onChange = useDirectoryFoldersChange();
  const { tree = [] } = useDirectoryFolders();
  const { t } = useTranslation('labels');
  const root = '__ROOT__';

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

  return (
    <Dialog
      renderContent={(close) => (
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
          <Button
            onClick={() =>
              onChange({
                id: null,
                folder:
                  Array.isArray(selected) ||
                  selected === root
                    ? null
                    : selected,
              }).then(() => {
                close();
              })
            }
          >
            Apply
          </Button>
        </>
      )}
      renderTrigger={(open) =>
        children({
          appendMoverToEach: (xs) =>
            map(xs, (item) => ({
              ...item,
              move: open,
            })),
          open,
        })
      }
      title="moveTo"
    />
  );
};

DialogMoveTo.propTypes = {
  children: PropTypes.func.isRequired,
};

export default DialogMoveTo;
