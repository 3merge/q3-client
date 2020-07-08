import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  tiled: {
    position: 'relative',
    marginBottom: theme.spacing(2),
    maxWidth: '100%',
  },
  errorBar: {
    backgroundColor: red[900],
    height: 4,
  },
  contentBlock: {
    maxWidth: '75%',
  },
}));

const Tile = ({
  children,
  title,
  subtitle,
  renderFooter,
  slim,
  divider,
}) => {
  const { t } = useTranslation();
  const { tiled } = useStyles();
  const hasSubtitle = Boolean(subtitle);

  return (
    <Paper
      elevation={0}
      component="section"
      className={tiled}
    >
      <Box pt={2} pb={slim ? 0 : 2} px={slim ? 0 : 2}>
        <Box
          px={slim ? 2 : 0}
          style={
            divider
              ? {
                  borderBottom: '2px solid #F5F7F9',
                  paddingBottom: '1rem',
                  marginBottom: '1rem',
                }
              : {}
          }
        >
          {title && (
            <Typography variant="overline" component="h3">
              {t(`titles:${title}`)}
            </Typography>
          )}
          {hasSubtitle && (
            <Typography
              variant="body2"
              style={{ maxWidth: '68%' }}
            >
              {t(`descriptions:${subtitle}`)}
            </Typography>
          )}
        </Box>
        <Box my={2}>{children}</Box>
        {renderFooter && <Box pt={1}>{renderFooter()}</Box>}
      </Box>
    </Paper>
  );
};

Tile.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  renderFooter: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

Tile.defaultProps = {
  renderFooter: null,
  subtitle: null,
};

export default Tile;
