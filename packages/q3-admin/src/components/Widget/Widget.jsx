import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Fade } from '@material-ui/core';
import WidgetTitle from '../WidgetTitle';

const Widget = ({ children, title, timeout, ...rest }) => {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    try {
      setShow(ref.current.hasChildNodes());
    } catch (e) {
      // noop
    }
  }, []);

  return (
    <Fade in={show} timeout={timeout}>
      <Paper
        elevation={0}
        style={{ display: show ? undefined : 'none' }}
        {...rest}
      >
        <Box p={1}>
          <WidgetTitle text={title} />
          <Box ref={ref}>{children}</Box>
        </Box>
      </Paper>
    </Fade>
  );
};

Widget.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  title: PropTypes.string.isRequired,
  timeout: PropTypes.number,
};

Widget.defaultProps = {
  children: null,
  timeout: 0,
};

export default Widget;
