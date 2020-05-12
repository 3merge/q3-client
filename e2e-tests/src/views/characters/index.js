import React from 'react';
import {
  genCollection,
  genList,
  genDetail,
} from 'q3-admin/lib/builders';
import GroupIcon from '@material-ui/icons/Group';
import CharacterFilter from '../../components/CharacterFilter';
import General from './general';

const collectionInfo = {
  icon: GroupIcon,
  collectionName: 'characters',
  resourceName: 'characters',
  resourceNameSingular: 'character',
  lookup: ['role', 'gender'],
  segments: {
    'Lead Roles': '?role=Lead',
  },
};

const views = {
  general: General,
};

const DetailProps = {
  files: true,
  notes: true,
  history: true,
  links: () => [
    {
      to: '/',
      label: 'Home',
    },
    {
      to: '/',
      label: 'Related characters',
    },
    {
      to: '/',
      label: 'Props',
    },
  ],
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
  addForm: () => <p>ADD</p>,
  ListProps,
});

export default genCollection({
  ...collectionInfo,
  PageDetail,
  PageList,
  PageDetailProps,
});
