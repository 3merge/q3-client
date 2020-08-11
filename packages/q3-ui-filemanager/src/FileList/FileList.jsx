import React from 'react';
import { merge, groupBy, set } from 'lodash';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import File from '../File';
import Drop from '../Drop';

const getPath = (filename) => {
  const dir = filename.split('/');
  dir.pop();
  dir.push('default');
  return dir.join('.');
};

const removeFileExtension = (filename) =>
  filename.substring(0, filename.lastIndexOf('.')) ||
  filename;

export const makeDirectories = (a = []) =>
  a
    .map((next) =>
      set({}, getPath(removeFileExtension(next.name)), [
        next,
      ]),
    )
    .reduce((acc, next) => {
      return merge({}, acc, next);
    }, {});

const FilterList = ({ drop, files }) => {
  const { t } = useTranslation();

  const b = groupBy(files, (v) => {
    return v.tag;
  });

  const getTitle = (tag) =>
    tag && String(tag) !== 'undefined'
      ? t(`titles:${tag}`)
      : t('titles:misc');

  const renderFile = (file, i) => (
    <File
      key={i}
      name={file.name}
      url={file.url}
      size={file.size}
    />
  );

  return Object.entries(b).map(([tag, group], i) => (
    <Box width="100%">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Material-UI
        </Link>
      </Breadcrumbs>
      {drop.includes(tag) ? (
        <Drop onDrop={() => null}>
          {(pending) =>
            [...pending, ...group].map(renderFile)
          }
        </Drop>
      ) : (
        group.map(renderFile)
      )}
    </Box>
  ));
};

export default FilterList;
