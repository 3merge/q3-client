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
import commonProps from '../props';

const NewsCard = ({
  imgSrc,
  title,
  to,
  label,
  md,
  date,
  ...rest
}) => {
  const { iconCls, ribbon } = useStyles();
  return (
    <Wrapper md={md} sm={6} xs={12} to={to}>
      {imgSrc && (
        <div className={iconCls}>
          <LazyLoadImage src={imgSrc} alt={title} />
        </div>
      )}
      <CardContent>
        {label && <span className={ribbon}>{label}</span>}
        <Box px={1}>
          <Header title={title} {...rest} />
          {date && (
            <Typography align="right" variant="subtitle2">
              {moment(date).format('ddd, MMMM, YYYY')}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Wrapper>
  );
};

NewsCard.propTypes = {
  ...commonProps,
  label: PropTypes.string.isRequired,
  md: PropTypes.number,
  date: PropTypes.string,
};

NewsCard.defaultProps = {
  md: 4,
  date: null,
};

export default NewsCard;
