import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import useStyle from './useStyle';

export const Panel = ({
  title,
  children,
  transitionDelay,
}) => {
  const { bordered, subtext } = useStyle();
  const { t } = useTranslation();

  return (
    <Fade
      in
      style={{ transitionDelay: `${transitionDelay}ms` }}
    >
      <Box className={bordered} component="section">
        <Box display="flex" justifyContent="space-between">
          <Typography variant="overline" color="primary">
            {t(`titles:${title}`)}
          </Typography>
        </Box>
        <Box my={1} className={subtext}>
          {children}
        </Box>
      </Box>
    </Fade>
  );
};

Panel.defaultProps = {
  transitionDelay: 0,
};

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  transitionDelay: PropTypes.number,
};

export default Panel;
