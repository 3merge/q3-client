import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Empty from '../../images/empty.png';
import Error from '../../images/error.png';
import Missing from '../../images/lost.png';

const useStyles = makeStyles(() => ({
  centered: {
    display: 'block',
    margin: '0 auto',
    width: 500,
    maxWidth: '100%',
  },
}));

const Graphic = ({ alt, src, className }) => {
  const { t } = useTranslation();
  const { centered } = useStyles();
  return (
    <img
      alt={t(`labels:${alt}`)}
      className={classNames(centered, className)}
      src={src}
    />
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
  <Graphic alt="error" src={Error} {...props} />
);

export const EmptyGraphic = (props) => (
  <Graphic alt="empty" src={Missing} {...props} />
);

export const MissingGraphic = (props) => (
  <Graphic alt="missing" src={Empty} {...props} />
);

export default Graphic;
