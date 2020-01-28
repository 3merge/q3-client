import React from 'react';
import { Link } from '@reach/router';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import Header from 'q3-ui/lib/header';
import Context from './state';
import { curryIf, ellipsis } from './utils';

const PageHeader = ({ children, titleProp }) => {
  const { t } = useTranslation();
  const {
    resourceName,
    resourceNameSingular,
    id,
    ...rest
  } = React.useContext(Context);

  const title = titleProp
    ? get(rest, `${resourceNameSingular}.${titleProp}`, '')
    : t(`titles:${resourceName}`);

  return (
    <Header
      position="relative"
      name={ellipsis(title)}
      renderRight={curryIf(
        children,
        <Box display="flex" style={{ height: 64 }}>
          {children}
        </Box>,
      )}
      renderPreIdentifier={curryIf(
        id,
        <IconButton
          component={Link}
          to={`/${resourceName}`}
          aria-label={t('labels:backToList')}
        >
          <KeyboardBackspace />
        </IconButton>,
      )}
    />
  );
};

PageHeader.propTypes = {
  titleProp: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
};

PageHeader.defaultProps = {
  children: null,
  titleProp: null,
};

export default PageHeader;
