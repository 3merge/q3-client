import React from 'react';
import AttachMoney from '@material-ui/icons/AttachMoney';
import {
  genCollection,
  genList,
  genDetail,
  genLazy,
} from 'q3-admin/lib/builders';

const resolvers = ({
  id,
  photo,
  firstName,
  lastName,
  email,
  createdBy,
  investments,
  ...rest
}) => ({
  id,
  name: `${firstName} ${lastName}`,
  description: email,
  url: `/investors/${id}`,
  investments: investments ? investments.length : 0,
  createdBy: createdBy ? `${createdBy.firstName}` : 'Sys',
  photo,
  ...rest,
});

const registerPanels = (data) => {
  if (!Object.keys(data).length) return [];

  return [
    {
      title: 'Investments',
      content: `There are currently ${data.investments.length} in the portfolio`,
    },
  ];
};

const views = {
  invoice: genLazy(import('./InvestorProfile')),
  investments: genLazy(import('./InvestorInvestments')),
};

const collectionInfo = {
  icon: AttachMoney,
  resourceName: 'investors',
  resourceNameSingular: 'investor',
  collectionName: 'api-investors',
};

const PageDetail = genDetail({
  DetailProps: {
    trash: true,
    notes: true,
    history: true,
    files: true,
    registerPanels,
  },
  views,
});

const PageList = genList({
  onSearch: resolvers,
  ListProps: {
    resolvers,
  },
});

export default genCollection({
  ...collectionInfo,
  PageDetail,
  PageList,
  PageListProps: {},
});
