import React from 'react';
import PropTypes from 'prop-types';
import { last } from 'lodash';
import Rest from 'q3-ui-test-utils/lib/rest';
import dataSourceJson from './storiesApiDataSource.json';

const StoriesApiMockWrapper = ({ children }) => {
  const [dataSource, setDataSource] = React.useState(
    dataSourceJson,
  );

  const getNewId = (out) => {
    const { id } = last(dataSource);
    const newId = Number(id) + 1;
    return Object.assign(out, {
      id: newId,
      photo: `https://randomuser.me/api/portraits/women/${newId}.jpg`,
    });
  };

  const compareIds = (a, b) => String(a.id) === String(b);
  const getId = (url) => url.split('/api-investors/')[1];
  const getSubId = (url) => getId(url).split('/');

  const findById = (id) =>
    dataSource.find((item) => {
      return compareIds(item, id);
    });

  const filterBy = (id) =>
    dataSource.filter((item) => {
      return compareIds(item, id);
    });

  const mapById = (id, data) =>
    dataSource.map((item) => {
      return compareIds(item, id) ? data : item;
    });

  const onCreate = (d) => {
    return getNewId(JSON.parse(d));
  };

  const defineMockRoutes = (m) => {
    m.onGet(/\/api-investors\/\d+\/investments/).reply(
      ({ url }) => {
        const [sub] = getSubId(url);
        const { investments } = findById(sub);
        return [200, { investments }];
      },
    );

    m.onGet(/\/api-investors\/\d+\/uploads/).reply(200, {
      uploads: [
        {
          name: 'SpecSheet.png',
        },
      ],
    });

    m.onPost(/\/api-investors\/\d+\/uploads/).reply((v) => {
      return [200, { uploads: [] }];
    });

    m.onGet(/\/api-investors\/\d+/).reply(({ url }) => {
      const investor = findById(getId(url));
      return [200, { investor }];
    });

    m.onPatch(
      /\/api-investors\/\d+\/investments\?ids=*/,
    ).reply(({ url, data }) => {
      const ids = url
        .split('?')[1]
        .split('&')
        .map((v) => v.split('ids[]=')[1]);

      const [sub] = getSubId(url);
      const investor = findById(sub);
      const newInvestor = {
        ...investor,
        investments: investor.investments.map((i) => {
          return ids.includes(String(i.id))
            ? { ...i, ...JSON.parse(data) }
            : i;
        }),
      };

      const investors = mapById(sub, newInvestor);
      setDataSource(investors);

      return [
        200,
        { investments: newInvestor.investments },
      ];
    });

    m.onPatch(
      /\/api-investors\/\d+\/investments\/\d+/,
    ).reply(({ url, data }) => {
      const [sub, , resource] = getSubId(url);
      const investor = findById(sub);
      const newInvestor = {
        ...investor,
        investments: investor.investments.map((i) =>
          compareIds(i, resource)
            ? { ...i, ...JSON.parse(data) }
            : i,
        ),
      };

      const investors = mapById(sub, newInvestor);
      setDataSource(investors);

      return [
        200,
        { investments: newInvestor.investments },
      ];
    });

    m.onPost(/\/api-investors\/\d+\/investments/).reply(
      ({ url, data }) => {
        const [sub] = getSubId(url);
        const investor = findById(sub);
        const newInvestments = {
          id: investor.investments.length + 1,
          ...JSON.parse(data),
        };

        const newInvestor = {
          ...investor,
          investments: investor.investments.concat(
            newInvestments,
          ),
        };

        const investors = mapById(sub, newInvestor);
        setDataSource(investors);

        return [
          201,
          { investments: newInvestor.investments },
        ];
      },
    );

    m.onPatch(/\/api-investors\/\d+/).reply(
      ({ url, data }) => {
        const id = getId(url);
        const investor = {
          ...findById(id),
          ...JSON.parse(data),
        };

        const investors = mapById(id, investor);
        setDataSource(investors);

        return [200, { investor }];
      },
    );

    m.onDelete(/\/api-investors\/\d+/).reply(({ url }) => {
      const id = getId(url);
      const investors = filterBy(id);
      setDataSource(investors);

      return [204, { investors }];
    });

    m.onPost('/api-investors').reply(({ data }) => [
      201,
      { investor: onCreate(data) },
    ]);

    m.onGet(/api-investors/).reply(({ url }) => {
      if (url.includes('empty'))
        return [200, { investors: [] }];

      return [
        200,
        {
          total: dataSource.length,
          investors: dataSource,
        },
      ];
    });
  };

  return (
    <Rest define={defineMockRoutes} delay={250}>
      {children}
    </Rest>
  );
};

StoriesApiMockWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoriesApiMockWrapper;
