import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import * as colors from '@material-ui/core/colors';

const ColoredAvatar = ({
  word,
  superscript,
  imgSrc,
  icon: Icon,
}) => {
  const [src, setSrc] = React.useState(imgSrc);
  const letter = word.toUpperCase().charAt(0);
  const [text, setText] = React.useState(
    Icon ? <Icon /> : letter,
  );

  let backgroundColor;
  let color;

  switch (letter) {
    case 'A':
    case 'Q':
      backgroundColor = colors.red['50'];
      color = colors.red['900'];
      break;
    case 'B':
    case 'R':
      backgroundColor = colors.pink['50'];
      color = colors.red['900'];
      break;
    case 'C':
    case 'S':
      backgroundColor = colors.purple['50'];
      color = colors.purple['900'];
      break;
    case 'D':
    case 'T':
      backgroundColor = colors.deepPurple['50'];
      color = colors.deepPurple['900'];
      break;
    case 'E':
    case 'U':
      backgroundColor = colors.indigo['50'];
      color = colors.indigo['900'];
      break;
    case 'F':
    case 'V':
      backgroundColor = colors.blue['50'];
      color = colors.blue['900'];
      break;
    case 'G':
    case 'W':
      backgroundColor = colors.lightBlue['50'];
      color = colors.lightBlue['900'];
      break;
    case 'H':
    case 'X':
      backgroundColor = colors.cyan['50'];
      color = colors.cyan['900'];
      break;
    case 'I':
    case 'Y':
      backgroundColor = colors.teal['50'];
      color = colors.teal['900'];
      break;
    case 'J':
    case 'Z':
      backgroundColor = colors.green['50'];
      color = colors.green['900'];
      break;
    case 'k':
    case 'l':
      backgroundColor = colors.lightGreen['50'];
      color = colors.lightGreen['900'];
      break;
    case 'm':
    case 'n':
      backgroundColor = colors.orange['50'];
      color = colors.orange['900'];
      break;
    case 'o':
    case 'p':
      backgroundColor = colors.amber['50'];
      color = colors.amber['900'];
      break;
    default:
      backgroundColor = colors.deepOrange['50'];
      color = colors.deepOrange['900'];
      break;
  }

  const onError = function catchBrokenLinks() {
    setSrc(null);
    setText(<BrokenImageIcon />);
  };

  React.useEffect(() => {
    if (!text && !src) {
      setText(letter);
    }
  }, []);

  return (
    <Badge badgeContent={superscript} style={{ color }}>
      <Avatar
        imgProps={{ onError }}
        src={src}
        alt={word}
        style={{
          border: '1px solid #fff',
          backgroundColor,
          color,
        }}
      >
        {typeof src === 'object' ? src : text}
      </Avatar>
    </Badge>
  );
};

ColoredAvatar.propTypes = {
  word: PropTypes.string,
  imgSrc: PropTypes.string,
  superscript: PropTypes.number,
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func,
  ]),
};

ColoredAvatar.defaultProps = {
  superscript: 0,
  word: '',
  imgSrc: null,
  icon: null,
};

export default ColoredAvatar;
