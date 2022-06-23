import React from 'react';
import { useNavigate } from '@reach/router';
import { string } from 'q3-ui-helpers';
import { getPageHistory } from '../containers/BackProvider/BackProvider';
import { Definitions } from '../containers/state';

export default () => {
  const navigate = useNavigate();
  const { directoryPath = '/', id } =
    React.useContext(Definitions);

  return id
    ? () =>
        navigate(
          getPageHistory().find((item) =>
            new RegExp(
              `${string.removeTrailingSlash(
                directoryPath,
              )}($|\\/$|\\?)`,
            ).test(String(item)),
          ) || directoryPath,
        )
    : null;
};
