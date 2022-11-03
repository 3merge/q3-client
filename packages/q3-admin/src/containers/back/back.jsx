import React from 'react';
import { Link } from '@reach/router';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import HomeIcon from '@material-ui/icons/Home';
import { useMediaQuery } from '@material-ui/core';
import { useBack } from '../../hooks';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const Back = () => {
  const fn = useBack();
  const isDesktop = useMediaQuery((theme) =>
    theme.breakpoints.up('lg'),
  );

  return (
    <div>
      {fn ? (
        <ButtonWithIcon
          icon={KeyboardBackspace}
          role="link"
          label="previous"
          onClick={fn}
          transparent={isDesktop}
        />
      ) : (
        <ButtonWithIcon
          icon={HomeIcon}
          role="link"
          label="home"
          component={Link}
          to="/"
        />
      )}
    </div>
  );
};

export default Back;
