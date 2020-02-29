import React from 'react';
import { Link } from '@reach/router';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import HeaderQ3 from 'q3-ui/lib/header';
import { curryIf, ellipsis } from '../../components/utils';
import Context from '../state';
import Title from './title';

const useTitle = (
  state,
  { titleProp, parenthesesProp, resourceNameSingular },
) => {
  const { t } = useTranslation('titles');
  let output = '';

  if (titleProp)
    output += ellipsis(
      get(state, `${resourceNameSingular}.${titleProp}`),
    );

  if (parenthesesProp)
    output += ` (${get(
      state,
      `${resourceNameSingular}.${parenthesesProp}`,
    )})`;

  return output.length ? output : t(resourceNameSingular);
};

const rendererRight = (children) =>
  curryIf(
    children,
    <Box display="flex" height="100%" alignItems="center">
      {children}
    </Box>,
  );

const rendererLeft = (id, resourceName) =>
  curryIf(
    id,
    <IconButton component={Link} to={`/${resourceName}`}>
      <KeyboardBackspace />
    </IconButton>,
  );

const Header = ({
  children,
  titleProp,
  subtitleProp,
  parenthesesProp,
  titleRenderer,
}) => {
  const {
    resourceName,
    resourceNameSingular,
    id,
    fetching,
    ...rest
  } = React.useContext(Context);

  const title = useTitle(rest, {
    titleProp,
    parenthesesProp,
    resourceNameSingular,
  });

  return (
    <HeaderQ3
      position="relative"
      renderPreIdentifier={rendererLeft(id, resourceName)}
      renderRight={rendererRight(children)}
      name={
        fetching ? (
          <Skeleton width={250} height={68} />
        ) : (
          <Title
            title={title}
            subtitle={get(
              rest,
              `${resourceNameSingular}.${subtitleProp}`,
              null,
            )}
            {...(titleRenderer
              ? titleRenderer(rest)
              : null)}
          />
        )
      }
    />
  );
};

Header.propTypes = {
  /**
   * Renders a custom title.
   * The value corresponds to a key in the context's singular state.
   * See code sample above for more information.
   */
  titleProp: PropTypes.string,

  /**
   * Renders subtext in parentheses beside the title.
   */
  subtitleProp: PropTypes.string,

  /**
   * Renders small text below the title
   */
  parenthesesProp: PropTypes.string,

  /**
   * A renderer function for dynamically replacing the titleProp and subtitleProp outputs.
   */
  titleRenderer: PropTypes.func,

  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
};

Header.defaultProps = {
  children: null,
  titleProp: null,
  subtitleProp: null,
  parenthesesProp: null,
  titleRenderer: null,
};

export default Header;
