import React from 'react';
import { Link } from '@reach/router';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import HomeIcon from '@material-ui/icons/Home';
import { useBack } from '../../hooks';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const Back = () => {
  const fn = useBack();

  return (
    <div>
      {fn ? (
        <ButtonWithIcon
          icon={KeyboardBackspace}
          role="link"
          label="previous"
          onClick={fn}
          transparent
        />
      ) : (
        <ButtonWithIcon
          icon={HomeIcon}
          role="link"
          label="home"
          component={Link}
          to="/"
          transparent
        />
      )}
    </div>
  );
};

export default Back;
