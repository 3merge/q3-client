import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import useStyles from '../useStyle';
import Header from '../header';
import Wrapper from '../wrapper';

const ProjectCard = ({
  imgSrc,
  to,
  label,
  buttonText,
  fullWidth,
  square,
  ...rest
}) => {
  const cls = useStyles({
    square,
  });
  const sizing = {
    md: 4,
    sm: 6,
    xs: 12,
  };

  if (fullWidth) {
    delete sizing.sm;
    delete sizing.md;
  }

  return (
    <Wrapper {...sizing} to={to}>
      <div className={cls.iconHead}>
        <Avatar className={cls.iconThumb} src={imgSrc} />
        <Typography
          variant="overline"
          className={cls.iconText}
        >
          {label}
        </Typography>
      </div>
      <Divider light />
      <CardContent className={cls.iconBody}>
        <Header {...rest} />
        <Typography
          variant="subtitle2"
          style={{ textDecoration: 'underline' }}
        >
          {buttonText}
        </Typography>
      </CardContent>
    </Wrapper>
  );
};

ProjectCard.propTypes = {
  label: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  ...commonProps,
};

export default ProjectCard;
