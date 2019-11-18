import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Empty from '../../images/empty.png';

import ErrorSrc from '../../images/error.png';
import Missing from '../../images/lost.png';

const useStyles = makeStyles((theme) => ({
  centered: {
    display: 'block',
    margin: '0 auto',
    width: 500,
    height: 350,
    maxWidth: '100%',
    position: 'relative',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: 250,
    },
    '& > img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
    },
  },
}));

const Graphic = ({ alt, src, className }) => {
  const { t } = useTranslation();
  const { centered } = useStyles();
  return (
    <Fade in>
      <div className={classNames(centered, className)}>
        <LazyLoadImage alt={t(`labels:${alt}`)} src={src} />
      </div>
    </Fade>
  );
};

Graphic.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Graphic.defaultProps = {
  className: null,
};

export const ErrorGraphic = (props) => (
  <Graphic alt="error" src={ErrorSrc} {...props} />
);

export const EmptyGraphic = (props) => (
  <Graphic alt="empty" src={Missing} {...props} />
);

export const MissingGraphic = (props) => (
  <Graphic alt="missing" src={Empty} {...props} />
);

export default Graphic;
