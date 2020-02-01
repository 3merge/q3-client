import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Header from '../header';
import Wrapper from '../wrapper';
import useStyles from '../useStyle';

export const DateString = ({ iso }) =>
  iso ? (
    <Typography align="right" variant="subtitle2">
      {moment(iso).format('ddd, MMMM, YYYY')}
    </Typography>
  ) : null;

DateString.propTypes = {
  /**
   * Date in ISO string format.
   */
  iso: PropTypes.string,
};

DateString.defaultProps = {
  iso: null,
};

export const Ribbon = ({ text }) => {
  if (!text) return null;
  const { ribbon } = useStyles();

  return <span className={ribbon}>{text}</span>;
};

Ribbon.propTypes = {
  /**
   * Ribbon interior text.
   */
  text: PropTypes.string,
};

Ribbon.defaultProps = {
  text: null,
};

export const CardImage = ({ src, alt, hasRibbon }) => {
  const { iconCls } = useStyles();

  return src ? (
    <div className={iconCls}>
      <LazyLoadImage src={src} alt={alt} />
    </div>
  ) : (
    // not the height to offset ribbon
    <div style={{ height: hasRibbon ? 32 : 0 }} />
  );
};

CardImage.propTypes = {
  /**
   *Image URL.
   */
  src: PropTypes.string,

  /**
   *Image alt attribute.
   */
  alt: PropTypes.string.isRequired,

  /**
   * Will include an offset height for the Ribbon.
   */
  hasRibbon: PropTypes.bool,
};

CardImage.defaultProps = {
  src: null,
  hasRibbon: false,
};

const NewsCard = ({
  imgSrc,
  title,
  to,
  label,
  md,
  date,
  ...rest
}) => (
  <Wrapper md={md} sm={6} xs={12} to={to}>
    <CardImage
      alt={title}
      src={imgSrc}
      hasRibbon={Boolean(label)}
    />
    <CardContent>
      <Ribbon text={label} />
      <Box px={1}>
        <Header title={title} {...rest} />
        <DateString iso={date} />
      </Box>
    </CardContent>
  </Wrapper>
);

NewsCard.propTypes = {
  /**
   * Text for badge (i.e category name).
   */
  label: PropTypes.string,

  /**
   * Card size on medium-width screens.
   */
  md: PropTypes.number,

  /**
   * ISO date string to render published tag.
   */
  date: PropTypes.string,

  /**
   * Card title text.
   */
  title: PropTypes.string.isRequired,

  /**
   * Card description text.
   */
  description: PropTypes.string.isRequired,

  /**
   * Card overline text.
   */
  name: PropTypes.string,

  /**
   * Click link destination.
   */
  to: PropTypes.string.isRequired,

  /**
   * Image URL for the card header.
   */
  imgSrc: PropTypes.string,
};

NewsCard.defaultProps = {
  md: 4,
  date: null,
  name: null,
  imgSrc: null,
  label: null,
};

export default NewsCard;
