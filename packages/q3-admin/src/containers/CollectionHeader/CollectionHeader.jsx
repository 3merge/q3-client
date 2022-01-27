import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Hidden,
  useMediaQuery,
} from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import Search from '../../components/Search';
import Back from '../back';
import useStyles from './styles';
import Segments from '../../components/Segments';

const CollectionHeader = ({ collectionName, id }) => {
  const cls = useStyles();
  const { t } = useTranslation('labels');
  const [anchor, setAnchor] = React.useState();
  const portalId = useMediaQuery((theme) =>
    theme.breakpoints.down('md'),
  )
    ? 'q3-mobile-utilities'
    : 'q3-desktop-utilities';

  React.useEffect(() => {
    setAnchor(document.getElementById(portalId));
  }, [portalId]);

  return (
    <>
      {anchor
        ? ReactDom.createPortal(
            <Box
              display="flex"
              alignItems="center"
              px={2}
              style={{ height: '100%' }}
              justifyContent="space-between"
              py={0.5}
              width="100%"
            >
              <Hidden mdDown>
                <Box>
                  <Typography
                    color="inherit"
                    component="h1"
                    className={cls.title}
                  >
                    {t(collectionName)}
                  </Typography>
                </Box>
              </Hidden>
              <Box
                whiteSpace="nowrap"
                display="flex"
                id="q3-collection-actions"
              >
                <Search />
                <Segments />
                <Box id="q3-filter" />
                <Box
                  whiteSpace="nowrap"
                  display="flex"
                  id="q3-collection-actions-top"
                />
              </Box>
            </Box>,
            anchor,
          )
        : null}
      {/* <div>
      {id ? (
        <Back />
      ) : (
        <Typography
          color="inherit"
          component="h1"
          className={cls.title}
        >
          {t(collectionName)}
        </Typography>
      )}
    </div> */}
    </>
  );
};

CollectionHeader.propTypes = {
  collectionName: PropTypes.string.isRequired,
  disableSearch: PropTypes.bool,
  id: PropTypes.string,
};

CollectionHeader.defaultProps = {
  disableSearch: false,
  id: undefined,
};

export default CollectionHeader;
