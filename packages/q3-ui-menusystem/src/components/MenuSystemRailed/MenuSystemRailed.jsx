import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { map, size } from 'lodash';
import { standard } from '../usePaperWidth/usePaperWidth';
import IconList from '../IconList';
import IconRail from '../IconRail';
import ListItem from '../ListItem';
import usePages from '../usePages';
import useStyle from './styles';

const MenuSystemRailed = ({ pages }) => {
  const { initialSelectedParent, pages: items } =
    usePages(pages);

  const [parent, setParent] = React.useState(
    initialSelectedParent,
  );

  const isActive = (item) =>
    item.active || parent
      ? parent.label === item.label
      : false;

  const handleClick = (item) => () => {
    setParent(item);
  };

  const renderIconItems = React.useCallback(
    () =>
      map(items, (item) => ({
        ...item,
        active: isActive(item),
        onClick: handleClick(item),
      })),
    [parent?.label],
  );

  const cls = useStyle({
    open: size(parent?.pages) > 0,
  });

  return (
    <Box display="flex" height="100%" width="100%">
      <IconRail>
        <IconList items={renderIconItems()} />
      </IconRail>
      <Box className={cls.flyout} flex={1} height="100%">
        <Box pt={4} px={2} width={standard}>
          <Typography
            color="secondary"
            component="span"
            variant="overline"
          >
            {parent?.label}
          </Typography>
          <List>
            {map(parent?.pages, (page, idx) => (
              <ListItem
                expandDefault
                key={idx}
                timeout={idx * 150}
                {...page}
              />
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default MenuSystemRailed;
