import React from 'react';
import AttachMoney from '@material-ui/icons/AttachMoney';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import { useLoading } from 'q3-ui-rest';
import { FilterGroup } from 'q3-components';
import {
  StoriesApiMockAuthentication,
  StoriesApiMockWrapper,
} from '../__fixtures__';
import App from '../components/app';
import Main from '../components/main';
import Add from './add';
import Detail from './detail';
import Collection from './collection';
import Page from './page';
import Table from './table';
import Filters from './filters';
import SubDetail from './subDetail';
import connect from './connect';

export default {
  title: 'Q3 Admin|Demo',
};

const resolver = ({
  id,
  photo,
  firstName,
  lastName,
  email,
  createdBy,
  investments,
  ...rest
}) => ({
  ...rest,
  id,
  name: `${firstName} ${lastName}`,
  description: email,
  url: `/investors/${id}`,
  investments: {
    base: investments ? investments.length : 0,
    toPrice: true,
  },
  createdBy: createdBy ? `${createdBy.firstName}` : 'Sys',
  photo,
  updatedAt: {
    base: rest.updatedAt,
    toDate: true,
    toChip: true,
  },
});

const Investors = (props) => (
  <Collection {...props}>
    <Page index {...props}>
      <Table
        HeaderProps={{
          subtitle: 'Testing',
        }}
        addComponent={
          <Add>
            <Form
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
              }}
            >
              <Field
                name="firstName"
                type="text"
                required
              />
              <Field name="lastName" type="text" required />
              <Field name="email" type="email" required />
            </Form>
          </Add>
        }
        filters={
          <Filters lookup={[]}>
            {() => (
              <FilterGroup title="work" count={['role']}>
                <Field
                  name="role"
                  type="text"
                  xl={12}
                  lg={12}
                />
              </FilterGroup>
            )}
          </Filters>
        }
        resolvers={resolver}
        defaultColumns={[
          'gender',
          'updatedAt',
          'investments',
          'updatedAt',
          'investments',
          'createdBy',
          'gender',
          'updatedAt',
          'investments',
          'updatedAt',
          'investments',
          'createdBy',
        ]}
        allColumns={[
          'gender',
          'updatedAt',
          'investments',
          'createdBy',
        ]}
      />
    </Page>
  </Collection>
);

const General = connect(({ data, ...rest }) => (
  <Form {...rest} initialValues={data}>
    <Field name="firstName" type="text" />
    <Field name="gender" type="text" />
  </Form>
));

const Hidden = connect(() => <div>Conditional</div>);

const Investments = () => (
  <SubDetail
    root="investments"
    cardProps={{
      title: 'company',
      attributes: ['shares'],
      editable: {
        shares: {
          type: 'number',
          min: 1,
        },
      },
    }}
    initialValues={{
      company: '',
      shares: 1,
    }}
    bulkEditorComponent={(props) => (
      <Form {...props}>
        <Field name="shares" type="number" min={1} />
      </Form>
    )}
  >
    <Form>
      <Field name="company" type="text" required />
      <Field name="shares" type="number" min={1} />
    </Form>
  </SubDetail>
);

const panels = (data) => {
  if (!Object.keys(data).length) return [];

  return [
    {
      title: 'Investments',
      content: `There are currently ${data.investments.length} in the portfolio`,
    },
  ];
};

const Investor = (props) => (
  <Collection {...props}>
    <Page
      {...props}
      index
      viewResolutions={{
        hidden: {
          roles: ['Admin'],
          conditional: ['gender=Male'],
        },
      }}
    >
      <Detail
        registerPanels={panels}
        files
        picture
        history
        links={[{ label: 'Test', to: '/' }]}
      >
        <General name="general" />
        <General name="general" />
        <General name="general" />
        <General name="general" />
        <General name="general" />
        <General name="general" />
        <General name="general" />
        <General name="general" />
        <Investments name="investments" />
        <Hidden name="hidden" />
      </Detail>
    </Page>
  </Collection>
);

const pages = [
  {
    icon: AttachMoney,
    component: Investors,
    collectionName: 'api-investors',
    resourceName: 'investors',
    resourceNameSingular: 'investor',
    index: true,
  },
  {
    component: Investor,
    collectionName: 'api-investors',
    resourceName: 'investors',
    resourceNameSingular: 'investor',
    id: true,
  },
];

const Loading = ({ children }) => {
  useLoading();
  return children;
};

const withProviders = (initialPath = '/') => (
  <Loading>
    <LocationProvider initialPath={initialPath}>
      <StoriesApiMockAuthentication>
        <StoriesApiMockWrapper>
          <Main
            pages={pages}
            render={() => <App pages={pages} />}
            ProfileBarProps={{
              profileImgSrc:
                'https://randomuser.me/api/portraits/men/83.jpg',
            }}
          />
        </StoriesApiMockWrapper>
      </StoriesApiMockAuthentication>
    </LocationProvider>
  </Loading>
);

export const FromList = withProviders('/investors');
export const FromDetail = withProviders('/investors/1');
export const FromSubDetail = withProviders(
  '/investors/1/investments',
);

export const FromTrash = withProviders(
  '/investors/1/trash',
);

export const FromLog = withProviders('/investors/1/log');
