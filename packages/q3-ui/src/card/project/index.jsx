import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import useStyles from '../useStyle';
import Header from '../header';
import Wrapper from '../wrapper';

export const getSizing = (fullWidth) => {
  const sizing = {
    md: 4,
    sm: 6,
    xs: 12,
  };

  if (fullWidth) {
    delete sizing.sm;
    delete sizing.md;
  }

  return sizing;
};

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

  return (
    <Wrapper {...getSizing(fullWidth)} to={to}>
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
   * A logo URL for this project.
   */
  imgSrc: PropTypes.string.isRequired,

  /**
   * The project URL.
   */
  to: PropTypes.string.isRequired,

  /**
   * Renders the card with 100% width.
   */
  fullWidth: PropTypes.bool,

  /**
   * Renders the card as a square.
   */
  square: PropTypes.bool,

  /**
   * Project identifier text.
   */
  label: PropTypes.string.isRequired,

  /**
   * Custom text for the link.
   */
  buttonText: PropTypes.string.isRequired,
};

ProjectCard.defaultProps = {
  name: null,
  square: false,
  fullWidth: false,
};

export default ProjectCard;
