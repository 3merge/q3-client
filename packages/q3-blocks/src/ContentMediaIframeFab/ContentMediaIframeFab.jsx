import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useTranslation } from 'react-i18next';

const ContentMediaIframeFab = ({
  embed,
  title,
  children,
  height,
  width,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {children(
        ({ onClick }) => (
          <Fab
            aria-label={t('labels:watchVideo')}
            color="primary"
            onClick={onClick}
          >
            <PlayArrowIcon />
          </Fab>
        ),
        () => (
          <iframe
            src={`${embed}?autoplay=1`}
            title={title}
            frameBorder="0"
            allowFullScreen
            style={{
              height,
              width,
            }}
          />
        ),
      )}
    </>
  );
};

ContentMediaIframeFab.defaultProps = {
  height: '100%',
  width: '100%',
};

ContentMediaIframeFab.propTypes = {
  children: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  embed: PropTypes.string.isRequired,
  height: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
  ]),
  width: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default ContentMediaIframeFab;
