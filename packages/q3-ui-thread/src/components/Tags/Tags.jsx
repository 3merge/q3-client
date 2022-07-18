import React from 'react';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grow from '@material-ui/core/Grow';
import ListItem from '@material-ui/core/ListItem';
import MenuList from '@material-ui/core/MenuList';
import Popover from '@material-ui/core/Popover';
import { map, includes, size } from 'lodash';
import DoneIcon from '@material-ui/icons/Done';
import ScatterPlotSharpIcon from '@material-ui/icons/ScatterPlotSharp';
import { useOpen } from 'useful-state';
import ThreadContext from '../ThreadContext';
import useNoteTags from '../useNoteTags';

const Tags = ({ data, tags, selectTag }) => {
  const { canTag } = React.useContext(ThreadContext);
  const allTags = useNoteTags(data);
  const ref = React.useRef();
  const { open, isOpen, close } = useOpen();

  const handleClick = (newTagValue) => () => {
    selectTag(newTagValue);
  };

  return canTag ? (
    <Box display="inline-flex" ml={0.5}>
      <Button
        endIcon={
          <Badge badgeContent={size(tags)}>
            <ScatterPlotSharpIcon />
          </Badge>
        }
        onClick={open}
        ref={ref}
      >
        Tags
      </Button>
      <Popover
        anchorEl={ref.current}
        disablePortal
        keepMounted
        open={isOpen}
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
        <MenuList>
          {map(allTags, (t) => {
            const selected = includes(tags, t);

            return (
              <ListItem
                button
                dense
                onClick={handleClick(t)}
                selected={selected}
                item
                key={t}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                >
                  {t}
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

export default Tags;
