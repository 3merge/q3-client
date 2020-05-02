import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { browser } from 'q3-ui-helpers';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
} from 'react-share';

const EMAIL = 'Email';
const FACEBOOK = 'Facebook';
const LINKEDIN = 'LinkedIn';
const TWITTER = 'Twitter';

const { isBrowserReady } = browser;

const getPlatformByName = (name) => {
  switch (name) {
    case FACEBOOK:
      return {
        Button: FacebookShareButton,
        Icon: FacebookIcon,
      };
    case EMAIL:
      return {
        Button: EmailShareButton,
        Icon: EmailIcon,
      };
    case TWITTER:
      return {
        Button: TwitterShareButton,
        Icon: TwitterIcon,
      };
    case LINKEDIN:
      return {
        Button: LinkedinShareButton,
        Icon: LinkedinIcon,
      };
    default:
      return {
        Button: () => null,
        Icon: () => null,
      };
  }
};

const ShareButton = ({ platform }) => {
  const [url, setUrl] = React.useState();

  React.useEffect(() => {
    if (isBrowserReady()) setUrl(window.location.href);
  }, []);

  const { Button, Icon } = getPlatformByName(platform);

  return url ? (
    <Grid item>
      <Button url={url} style={{ cursor: 'pointer' }}>
        <Icon size={32} round />
      </Button>
    </Grid>
  ) : null;
};

ShareButton.propTypes = {
  platform: PropTypes.oneOf([
    FACEBOOK,
    TWITTER,
    LINKEDIN,
    EMAIL,
  ]).isRequired,
};

export default ShareButton;
