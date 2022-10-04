import React from 'react';
import {
  Box,
  Fade,
  Drawer,
  List,
  ListItem,
  Grow,
  Divider,
} from '@material-ui/core';
import { size } from 'lodash';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useOpen } from 'useful-state';
import CheckIcon from '@material-ui/icons/Check';
import useStyle from './styles';
import ButtonWithIcon from '../ButtonWithIcon';

// eslint-disable-next-line
const Actionbar = ({ children }) => {
  const cls = useStyle();
  const ref = React.useRef();
  const { close, isOpen, open } = useOpen();
  const [links, setLinks] = React.useState([]);

  const toggleLinks = () => {
    setLinks(
      ref.current
        ? Array.from(
            ref.current.querySelectorAll('a,button'),
          )
            .map((el) => {
              if (
                window.getComputedStyle(el)?.display ===
                'none'
              )
                return null;

              return {
                type: el.tagName,
                checked:
                  el.getAttribute('data-on') === 'true',
                label: el.getAttribute('aria-label'),
                node: el,
              };
            })
            .filter(Boolean)
        : [],
    );
  };

  React.useEffect(() => {
    toggleLinks();
  }, []);

  return (
    <>
      <Drawer anchor="bottom" open={isOpen} onClose={close}>
        <List>
          {links.map((item, idx, items) => (
            <React.Fragment key={item.label}>
              {idx !== 0 &&
                item.type !== items[idx - 1]?.type && (
                  <Divider
                    component="li"
                    style={{
                      margin: '1rem 0',
                    }}
                  />
                )}
              <ListItem
                component="li"
                disabled={item.node.disabled}
                button
                onClick={(e) => {
                  item.node.click(e);
                  close(e);
                }}
              >
                {item.checked && <CheckIcon />}
                {item.label}
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Grow in={size(links)}>
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
            onClick={open}
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
