import React from 'react';
import { url } from 'q3-ui-helpers';

export default (Component) => ({
  youtube,
  youtubeTitle,
  ...rest
}) => <Component {...url.getYoutube(youtube)} {...rest} />;
