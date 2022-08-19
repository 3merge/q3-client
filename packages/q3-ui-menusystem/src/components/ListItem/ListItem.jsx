import React from 'react';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import MuiListItem from '@material-ui/core/ListItem';
import { size } from 'lodash';
import SubList from '../SubList';
import useStyle from './styles';

const ListItem = ({
  active,
  href = '/',
  pages,
  icon: Icon,
  label,
  expandDefault,
}) => {
  const cls = useStyle();
  const ListItemProps = {
    classes: {
      selected: cls.listItemSelected,
      root: cls.listItem,
    },
    selected: active,
  };

  const [state, setState] = React.useState(
    active || expandDefault,
  );

  if (size(pages)) {
    return (
      <MuiListItem
        {...ListItemProps}
        style={{ display: 'block' }}
      >
        <Button
          className={cls.button}
          color="inherit"
          startIcon={Icon ? <Icon /> : null}
          fullWidth
          onClick={() =>
            setState((prevState) => !prevState)
          }
        >
          {label}
        </Button>
        <Collapse in={state}>
          <SubList items={pages} />
        </Collapse>
      </MuiListItem>
    );
  }

  return (
    <MuiListItem {...ListItemProps}>
      <Button
        color="inherit"
        className={cls.link}
        component={Link}
        fullWidth
        to={href}
        startIcon={<Icon />}
        endIcon={<span />}
      >
        {label}
      </Button>
    </MuiListItem>
  );
};

export default ListItem;
