import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import { array } from 'q3-ui-helpers';
import Download from '../Download';

export default (Component) => {
  const Header = ({ children, data, title, ...rest }) => {
    const cleaned = array.hasLength(data) ? data : [];
    return (
      <Card>
        <CardHeader
          title={title}
          action={
            <Box
              alignItems="center"
              display="flex"
              px={0.75}
            >
              {children}
              <Download title={title} data={cleaned} />
            </Box>
          }
        />
        <CardContent>
          <Component data={cleaned} {...rest} />
        </CardContent>
      </Card>
    );
  };

  Header.defaultProps = {
    data: [],
    children: null,
    title: 'Report',
  };

  Header.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.object,
    ]),
    data: PropTypes.arrayOf(PropTypes.shape({})),
    title: PropTypes.string,
  };

  return Header;
};
