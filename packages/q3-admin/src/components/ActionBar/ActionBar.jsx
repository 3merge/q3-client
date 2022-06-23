import React from 'react';
import {
  Box,
  Fade,
  Drawer,
  List,
  ListItem,
  Grow,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useOpen } from 'useful-state';
import useStyle from './styles';
import ButtonWithIcon from '../ButtonWithIcon';

// eslint-disable-next-line
const Actionbar = ({ children }) => {
  const cls = useStyle();
  const ref = React.useRef();
  const { close, isOpen, open } = useOpen();
  const [links, setLinks] = React.useState([]);

  const toggleLinks = (e) => {
    setLinks(
      ref.current
        ? Array.from(
            ref.current.getElementsByTagName('button'),
          ).map((el) => ({
            label: el.getAttribute('aria-label'),
            node: el,
          }))
        : [],
    );

    open(e);
  };

  return (
    <>
      <Drawer anchor="bottom" open={isOpen} onClose={close}>
        <List>
          {links.map((item) => (
            <ListItem
              disabled={item.node.disabled}
              button
              keu={item.label}
              onClick={(e) => {
                item.node.click(e);
                close(e);
              }}
            >
              {item.label}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Grow in>
        <Box
          position="fixed"
          top={0}
          right={0}
          height={65}
          display="flex"
          alignItems="center"
          mr={1.5}
        >
          <ButtonWithIcon
            onClick={toggleLinks}
            transparent
            icon={MoreVertIcon}
            label="actions"
          />
        </Box>
      </Grow>
      <Fade in>
        <Box ref={ref} display="flex" className={cls.root}>
          {children}
        </Box>
      </Fade>
    </>
  );
};

export default Actionbar;
