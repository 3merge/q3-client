import React from 'react';
import {
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  AccordionActions,
  Button,
} from '@material-ui/core';
import {
  Help as HelpIcon,
  ArrowRightAlt as ArrowRightAltIcon,
} from '@material-ui/icons';
import Dialog from 'q3-ui-dialog';
import { useLocation, Link } from '@reach/router';
import axios from 'axios';
import { filter, map, size } from 'lodash';
import DrawerItem from '../DrawerItem';

const Drawer = () => {
  const { pathname } = useLocation();
  const [data, setData] = React.useState();
  const active = filter(data, (item) => {
    try {
      return (
        item.location &&
        new RegExp(item.location, 'gi').test(pathname)
      );
    } catch (e) {
      return false;
    }
  });

  React.useEffect(
    () =>
      axios
        .get(
          '/documentation?limit=250&fields=title,location,id',
        )
        .then(({ data: { documents } }) => {
          setData(documents);
        })
        .catch(() => {
          // noop
        }),
    [],
  );

  return size(active) && !pathname.includes('docs') ? (
    <Dialog
      title="help"
      variant="drawer"
      closeOnRouteChange
      renderContent={() => {
        return map(active, (item) => (
          <Accordion
            elevation={0}
            key={item.title}
            TransitionProps={{ unmountOnExit: true }}
            square
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DrawerItem id={item.id} />
            </AccordionDetails>
            <AccordionActions>
              <Button
                component={Link}
                to={`/docs?id=${item.id}`}
                size="small"
                color="primary"
              >
                Read full article <ArrowRightAltIcon />
              </Button>
            </AccordionActions>
          </Accordion>
        ));
      }}
      renderTrigger={(onClick) => (
        <IconButton onClick={onClick} color="inherit">
          <HelpIcon />
        </IconButton>
      )}
    />
  ) : null;
};

export default Drawer;
