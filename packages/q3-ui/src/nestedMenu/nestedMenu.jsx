import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { withLocation } from 'with-location';
import useStyles, { useTreeItemStyles } from './useStyle';

const StyledTreeItem = (props) => {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon
            color="inherit"
            className={classes.labelIcon}
          />
          <Typography
            variant="body2"
            className={classes.labelText}
          >
            {labelText}
          </Typography>
        </div>
      }
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
};

StyledTreeItem.propTypes = {
  labelIcon: PropTypes.elementType.isRequired,
  labelText: PropTypes.string.isRequired,
};

const flattenItems = (items) => {
  const out = [];

  const run = (a) =>
    a.forEach((item) => {
      out.push(item);
      if (item.items)
        run(
          item.items.map((s) => ({
            parent: item.label,
            ...s,
          })),
        );
    });

  run(items);
  return out;
};

const StyledTreeView = ({ items, navigate, location }) => {
  const classes = useStyles();
  const { t } = useTranslation('labels');

  const getActiveElement = (key) => {
    const match = flattenItems(items).find(
      (item) => item.to === location.pathname,
    );

    return match ? match[key] : undefined;
  };

  const genTreeView = (menuItems) =>
    Array.isArray(menuItems) && menuItems.length > 0
      ? menuItems.map((item) => (
          <StyledTreeItem
            key={item.label}
            nodeId={item.label}
            labelText={t(item.label)}
            labelIcon={item.icon}
            onClick={() =>
              !item.items ? navigate(item.to) : null
            }
            onKeyPress={() =>
              !item.items ? navigate(item.to) : null
            }
          >
            {genTreeView(item.items)}
          </StyledTreeItem>
        ))
      : null;

  return (
    <TreeView
      className={classes.root}
      selected={getActiveElement('label')}
      defaultExpanded={[getActiveElement('parent')]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      {genTreeView(items)}
    </TreeView>
  );
};

StyledTreeView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      to: PropTypes.string,
      icon: PropTypes.node,
    }),
  ).isRequired,
  navigate: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withLocation(StyledTreeView);
