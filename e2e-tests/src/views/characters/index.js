import React from 'react';
import {
  genCollection,
  genList,
  genDetail,
  genLazy,
} from 'q3-admin/lib/builders';
import GroupIcon from '@material-ui/icons/Group';
import CharacterFilter from '../../components/CharacterFilter';

const collectionInfo = {
  icon: GroupIcon,
  collectionName: 'characters',
  resourceName: 'characters',
  resourceNameSingular: 'character',
};

const views = {
  general: genLazy(import('./general')),
};

const DetailProps = {
  files: true,
  notes: true,
  history: true,
};

const ListProps = {
  renderTop: CharacterFilter,
  filters: <CharacterFilter />,
};

const PageDetail = genDetail({
  HeaderProps: {
    titleProp: 'name',
  },
  DetailProps,
  views,
});

const PageDetailProps = {
  viewResolutions: {},
  tour: [],
};

const PageList = genList({
  ListProps,
});

export default genCollection({
  ...collectionInfo,
  PageDetail,
  PageList,
  PageDetailProps,
});
