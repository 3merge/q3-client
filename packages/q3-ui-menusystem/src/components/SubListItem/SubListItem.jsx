import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Button, ListItem } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import LabelIcon from '@material-ui/icons/Label';
import useStyle from './styles';

const SubListItem = ({ active, label, href = '/' }) => {
  const cls = useStyle();
  const { t } = useTranslation('labels');

  return (
    <ListItem className={cls.listItem}>
      <Button
        className={active ? cls.activeSegment : undefined}
        color="inherit"
        component={Link}
        fullWidth
        to={href}
        startIcon={<LabelIcon />}
        size="small"
      >
        {t(label)}
      </Button>
    </ListItem>
  );
};

SubListItem.defaultProps = {
  items: [],
};

SubListItem.propTypes = {};

export default SubListItem;
