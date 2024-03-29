import React from 'react';
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Link from '@material-ui/core/Link';
import { map, size } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import useDirectoryFolders from '../useDirectoryFolders';

const DirectoryBreadcrumbs = () => {
  const { breadcrumbs, change } = useDirectoryFolders();
  const { t } = useTranslation('labels');

  const handleChange = (v) => () => change(v);

  const handleChangeBackHome = handleChange(
    breadcrumbs[breadcrumbs.length - 2]?.id || null,
  );

  return (
    size(breadcrumbs) > 0 && (
      <Box
        className="q3-toolbar"
        alignItems="center"
        display="flex"
        mb={1}
      >
        <IconButton
          color="inherit"
          onClick={handleChangeBackHome}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          {/* eslint-disable-next-line */}
          <Link
            component="button"
            onClick={handleChange(null)}
          >
            {t('labels:root')}
          </Link>
          {map(breadcrumbs, (item, idx) =>
            idx === breadcrumbs.length - 1 ? (
              <strong
                key={item.name}
                style={{
                  fontSize: '0.877rem',
                }}
              >
                {item.name}
              </strong>
            ) : (
              // eslint-disable-next-line
              <Link
                // eslint-disable-next-line
                component="button"
                key={item}
                onClick={handleChange(item.id)}
              >
                {item.name}
              </Link>
            ),
          )}
        </Breadcrumbs>
      </Box>
    )
  );
};

DirectoryBreadcrumbs.defaultProps = {};
DirectoryBreadcrumbs.propTypes = {};

export default DirectoryBreadcrumbs;
