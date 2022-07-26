import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Grow from '@material-ui/core/Grow';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import MenuList from '@material-ui/core/MenuList';
import Popover from '@material-ui/core/Popover';
import {
  map,
  includes,
  size,
  isEqual,
  sortBy,
} from 'lodash';
import DoneIcon from '@material-ui/icons/Done';
import ScatterPlotSharpIcon from '@material-ui/icons/ScatterPlotSharp';
import { useOpen } from 'useful-state';
import { useTranslation } from 'q3-ui-locale';
import ThreadContext from '../ThreadContext';
import useNoteTags from '../useNoteTags';

const Tags = ({ tags, selectTag }) => {
  const { canTag } = React.useContext(ThreadContext);
  const { t } = useTranslation('labels');
  const ref = React.useRef();

  const allTags = useNoteTags();
  const { open, isOpen, close } = useOpen();

  const label = t('tags');
  const count = size(tags);

  const endIcon = React.useMemo(
    () => (
      <Badge badgeContent={count} overlap="rectangular">
        <ScatterPlotSharpIcon />
      </Badge>
    ),
    [count],
  );

  const handleClick = (newTagValue) => () => {
    selectTag(newTagValue);
  };

  return canTag && size(allTags) > 0 ? (
    <Box display="inline-flex" ml={0.5} ref={ref}>
      <Hidden implementation="css" smDown>
        <Button
          className="q3-thread-tag-select"
          endIcon={endIcon}
          onClick={open}
        >
          {label}
        </Button>
      </Hidden>
      <Hidden mdUp>
        <IconButton
          aria-label={label}
          color="inherit"
          onClick={open}
        >
          {endIcon}
        </IconButton>
      </Hidden>
      <Popover
        anchorEl={ref.current}
        disablePortal
        keepMounted
        id="q3-thread-tag-list"
        open={Boolean(isOpen)}
        onClose={close}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        style={{
          maxHeight: 350,
        }}
      >
        <MenuList component="ul">
          {!isEqual(sortBy(tags), sortBy(allTags)) && (
            <ListItem
              button
              component="li"
              dense
              onClick={handleClick(allTags)}
            >
              {t('selectAllTags')}
            </ListItem>
          )}
          {size(tags) > 0 && (
            <ListItem
              button
              component="li"
              dense
              onClick={handleClick([])}
            >
              {t('clearTags')}
            </ListItem>
          )}
          <Divider component="li" />
          {map(allTags, (tag) => {
            const selected = includes(tags, tag);

            return (
              <ListItem
                button
                component="li"
                dense
                onClick={handleClick(tag)}
                selected={selected}
                key={tag}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                >
                  {tag}
                  {selected && (
                    <Grow in>
                      <Box display="inline-block" ml={0.5}>
                        <DoneIcon />
                      </Box>
                    </Grow>
                  )}
                </Box>
              </ListItem>
            );
          })}
        </MenuList>
      </Popover>
    </Box>
  ) : null;
};

Tags.defaultProps = {
  tags: [],
};

Tags.propTypes = {
  selectTag: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Tags;
