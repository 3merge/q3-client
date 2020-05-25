import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import useStyle from './useStyle';

export const Panel = ({ title, children }) => {
  const { bordered, subtext } = useStyle();
  const { t } = useTranslation();

  return (
    <Box
      className={bordered}
      mb={1}
      mt={0.25}
      component="section"
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="overline" color="primary">
          {t(`titles:${title}`)}
        </Typography>
      </Box>
      <Divider
        style={{
          border: '1px solid rgb(230, 236, 241)',
        }}
      />
      <Box my={1} className={subtext}>
        {children}
      </Box>
    </Box>
  );
};

Panel.defaultProps = {};

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Panel;
