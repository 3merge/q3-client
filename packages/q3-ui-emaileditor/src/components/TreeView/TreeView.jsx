import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import EmailEditorContext from '../EmailEditorContext';
import { isPartial } from '../useEmailTemplates/useEmailTemplates';
import useStyle from './styles';

const EmailsTemplateSelect = () => {
  const cls = useStyle();
  const { id, setById, templates } = React.useContext(
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

  return (
    <>
      <Box mt={2} p={2} mb={-1}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
        >
          Email editor
        </Typography>
      </Box>
      <TreeView
        defaultExpanded={[0, 1]}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        selected={id}
        onNodeSelect={handleNodeSelect}
      >
        <TreeItem label="Partials" nodeId={0}>
          {partial.map((t) => (
            <TreeItem
              classes={cls}
              nodeId={t.id}
              label={t.name}
              key={t.id}
            />
          ))}
        </TreeItem>
        <TreeItem label="Templates" nodeId={1}>
          {full.map((t) => (
            <TreeItem
              classes={cls}
              nodeId={t.id}
              label={t.name}
            />
          ))}
        </TreeItem>
      </TreeView>
    </>
  );
};

EmailsTemplateSelect.propTypes = {
  id: PropTypes.string.isRequired,
  setById: PropTypes.func.isRequired,
  templates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
};

export default EmailsTemplateSelect;
