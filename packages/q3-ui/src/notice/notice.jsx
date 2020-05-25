import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link as ReachLink } from '@reach/router';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Link from '../link';
import useStyle from './useStyle';

const Notice = ({ content, to }) => {
  const { t } = useTranslation('labels');
  const { notice, noMargin } = useStyle();

  const getLinkAtts = (v) => {
    const isOutbound = String(v).startsWith('http');

    return isOutbound
      ? {
          component: 'a',
          href: v,
        }
      : {
          component: ReachLink,
          to: v,
        };
  };

  return (
    <Collapse in>
      <Box className={notice} component="aside" p={1}>
        <Typography
          color="inherit"
          align="center"
          className={noMargin}
        >
          {content}
        </Typography>
        {to && (
          <Box display="inline-block" ml={2}>
            <Link color="inherit" {...getLinkAtts(to)}>
              {t('learnMore')}
            </Link>
          </Box>
        )}
      </Box>
    </Collapse>
  );
};

Notice.propTypes = {
  content: PropTypes.string.isRequired,
  to: PropTypes.string,
};

Notice.defaultProps = {
  to: '',
};

export default Notice;
