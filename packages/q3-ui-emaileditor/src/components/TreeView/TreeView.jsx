import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useTranslation } from 'react-i18next';
import EmailEditorContext from '../EmailEditorContext';
import { isPartial } from '../useEmailTemplates/useEmailTemplates';
import useStyle from './styles';

const CustomTreeView = () => {
  const cls = useStyle();
  const { t } = useTranslation();
  const { id, setById, templates = [] } = React.useContext(
    EmailEditorContext,
  );

  const { partial, full } = templates.reduce(
    (acc, curr) => {
      if (isPartial(curr)) acc.partial.push(curr);
      else acc.full.push(curr);
      return acc;
    },
    {
      partial: [],
      full: [],
    },
  );

  const hasTemplateId = (xs) =>
    templates.findIndex((item) => item.id === xs) !== -1;

  const handleNodeSelect = (e, value) =>
    hasTemplateId(value) ? setById(value) : null;

  const renderTree = (xs) =>
    xs.map((temp) => (
      <TreeItem
        classes={cls}
        nodeId={temp.id}
        label={temp.name}
        key={temp.id}
      />
    ));

  return (
    <Box component="nav" p={1}>
      <Box mt={2} p={2} mb={-1}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
        >
          {t('titles:emailEditor')}
        </Typography>
      </Box>
      <TreeView
        defaultExpanded={[0, 1]}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        selected={id}
        onNodeSelect={handleNodeSelect}
      >
        <TreeItem
          classes={cls}
          label={t('labels:partials')}
          nodeId={0}
        >
          {renderTree(partial)}
        </TreeItem>
        <TreeItem
          classes={cls}
          label={t('labels:templates')}
          nodeId={1}
        >
          {renderTree(full)}
        </TreeItem>
      </TreeView>
    </Box>
  );
};

export default CustomTreeView;
