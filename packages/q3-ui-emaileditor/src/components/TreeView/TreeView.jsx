import React from 'react';
import Box from '@material-ui/core/Box';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useTranslation } from 'q3-ui-locale';
// eslint-disable-next-line
import { useProfileLang } from 'q3-ui-permissions';
import { capitalize, sortBy } from 'lodash';
import EmailEditorContext from '../EmailEditorContext';
import { isPartial } from '../useEmailTemplates/useEmailTemplates';
import useStyle from './styles';

const CustomTreeView = () => {
  const { wrapper: wrapperCls, ...cls } = useStyle();
  const { t } = useTranslation();
  const {
    id,
    setById,
    templates = [],
  } = React.useContext(EmailEditorContext);
  const lang = useProfileLang();

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

  const translateTemplateName = (xs) =>
    capitalize(
      t(`labels:${String(xs).replace(`${lang}-`, '')}`),
    );

  const renderTree = (xs) =>
    sortBy(
      xs.map((temp) => ({
        ...temp,
        label: translateTemplateName(temp.name),
      })),
      ['label'],
    ).map((temp) => (
      <TreeItem
        classes={cls}
        nodeId={temp.id}
        label={temp.label}
        key={temp.id}
      />
    ));

  return (
    <Box
      className={wrapperCls}
      component="nav"
      p={2}
      pr={6}
    >
      <TreeView
        defaultExpanded={['0', '1']}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        selected={id}
        onNodeSelect={handleNodeSelect}
      >
        <TreeItem
          classes={cls}
          label={t('labels:partials')}
          nodeId="0"
        >
          {renderTree(partial)}
        </TreeItem>
        <TreeItem
          classes={cls}
          label={t('labels:templates')}
          nodeId="1"
        >
          {renderTree(full)}
        </TreeItem>
      </TreeView>
    </Box>
  );
};

export default CustomTreeView;
