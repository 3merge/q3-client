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
    marginBottom: theme.spacing(4),
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
}) => {
  const { t } = useTranslation();
  const { tiled } = useStyles();
  const hasSubtitle = Boolean(subtitle);

  return (
    <Paper
      elevation={0}
      component="section"
      className={tiled}
      square
    >
      <Box p={2}>
        <Typography
          variant="h3"
          gutterBottom={!hasSubtitle}
        >
          {t(`titles:${title}`)}
        </Typography>
        {hasSubtitle && (
          <Typography variant="body1" gutterBottom>
            <div
              // eslint-disable-next-line
              dangerouslySetInnerHTML={{
                __html: t(`descriptions:${subtitle}`),
              }}
            />
          </Typography>
        )}
        {children}
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
