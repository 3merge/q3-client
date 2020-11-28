import React from 'react';
import PropTypes from 'prop-types';
import AccountBox from '@material-ui/icons/AccountBox';
import { teal, orange } from '@material-ui/core/colors';
import HistoryIcon from '@material-ui/icons/History';
import List, { ListItem, ActionBar } from 'q3-ui/lib/list';
import { useDetailAttributes } from 'q3-hooked';
import { object } from 'q3-ui-helpers';
import SidePanelContent from '../../SidePanelContent';

const Block = ({ includeAuthorship, resolver }) => {
  const {
    build,
    createdBy,
    sanitize,
    t,
    updatedBy,
  } = useDetailAttributes();

  let attributes = [];

  if (includeAuthorship) {
    if (createdBy)
      attributes.push({
        color: teal[700],
        icon: AccountBox,
        title: t('labels:creator'),
        description: createdBy,
      });

    if (updatedBy)
      attributes.push({
        color: orange[700],
        icon: HistoryIcon,
        title: t('labels:lastUpdated'),
        description: updatedBy,
      });
  }

  if (object.isFn(resolver))
    attributes = [...attributes, build(resolver)];

  return (
    attributes.length > 0 && (
      <SidePanelContent title="general">
        <List>
          {sanitize(attributes).map((option, i) => (
            <ListItem key={i} {...option}>
              <ActionBar actions={option.actions}>
                {option.action}
              </ActionBar>
            </ListItem>
          ))}
        </List>
      </SidePanelContent>
    )
  );
};

Block.defaultProps = {
  includeAuthorship: true,
};

Block.propTypes = {
  includeAuthorship: PropTypes.bool,
  resolver: PropTypes.func.isRequired,
};

export default Block;
