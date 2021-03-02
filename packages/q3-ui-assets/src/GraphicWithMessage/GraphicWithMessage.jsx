import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import * as SvgIcon from '../SvgIcons';
import useStyles from './useStyle';

export const ICON_NAMES = {
  'Add': SvgIcon.Add,
  'Build': SvgIcon.Build,
  'Connect': SvgIcon.Connect,
  'Done': SvgIcon.Done,
  'Empty': SvgIcon.Empty,
  'Error': SvgIcon.Error,
  'Files': SvgIcon.Files,
  'Lock': SvgIcon.Lock,
  'Missing': SvgIcon.Missing,
  'NoResults': SvgIcon.NoResults,
  'Note': SvgIcon.Note,
  'Photo': SvgIcon.Photo,
  'Puzzle': SvgIcon.Puzzle,
  'Placeholder': SvgIcon.Placeholder,
  'Search': SvgIcon.Search,
  'Signal': SvgIcon.Signal,
  'Throw': SvgIcon.Throw,
  'Unlock': SvgIcon.Unlock,
};

const getGraphicByName = (name, children = null) => {
  const El = ICON_NAMES[name];
  return El ? <El /> : children;
};

const GraphicWithMessage = ({
  children,
  description,
  icon,
  title,
  transparent,
  renderTop,
  renderBottom,
  h1,
}) => {
  const { t } = useTranslation();
  const { root, graphic } = useStyles({
    transparent,
  });

  const body = description || title;

  return (
    <Paper elevation={0} className={root}>
      <Box component="section" py={2}>
        <Container maxWidth="sm">
          {renderTop && renderTop()}
          <Box className={graphic}>
            {getGraphicByName(icon, children)}
          </Box>
          <Box
            mt={-2}
            textAlign="center"
            position="relative"
          >
            {title && (
              <Typography
                variant={h1 ? 'h1' : 'h2'}
                gutterBottom
              >
                {t(`titles:${title}`)}
              </Typography>
            )}
            {body && (
              <Typography component="p" variant="body2">
                {t(`descriptions:${body}`)}
              </Typography>
            )}
            {renderBottom && renderBottom()}
          </Box>
        </Container>
      </Box>
    </Paper>
  );
};

GraphicWithMessage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.oneOf(Object.keys(ICON_NAMES)),
  renderTop: PropTypes.func,
  renderBottom: PropTypes.func,
  transparent: PropTypes.bool,
  h1: PropTypes.bool,
};

GraphicWithMessage.defaultProps = {
  title: '',
  description: '',
  children: null,
  icon: null,
  renderTop: null,
  renderBottom: null,
  transparent: false,
  h1: false,
};

export default GraphicWithMessage;
