import generateList from './generateList';
import generateDetail from './generateDetail';
import generateCollection from './generateCollection';

export default class Collection {
  constructor({
    icon,
    resourceName,
    resourceNameSingular,
    collectionName,
    resolvers,
    ...rest
  }) {
    // eslint-disable-next-line
    if (!collectionName) collectionName = resourceName;

    this.$meta = {
      icon,
      resourceNameSingular,
      resourceName,
      collectionName,
      ...rest,
    };

    this.$generateDetail = { resolvers };
    this.$generateList = { resolvers };
    this.$generateDetailProps = {
      resolvers,
    };

    this.$generateListProps = { resolvers };
  }

  genUserOptions(roleType, args = {}) {
    if (!this.$meta.options) this.$meta.options = {};

    Object.assign(this.$meta.options, {
      [roleType]: args,
    });

    return this;
  }

  genResolver(resolvers) {
    [
      '$generateDetail',
      '$generateList',
      '$generateDetailProps',
      '$generateListProps',
    ].forEach((namespace) => {
      Object.assign(this[namespace], {
        resolvers,
      });
    });

    return this;
  }

  genHeader(args = {}) {
    this.$generateDetail.HeaderProps = args;
    return this;
  }

  genNew(component) {
    this.$generateList.addComponent = component;
    return this;
  }

  genFilter(component) {
    this.$generateListProps.filterComponent = component;
    return this;
  }

  genViews(views = {}) {
    this.$generateDetail.views = Object.entries(
      views,
    ).reduce((acc, [key, value]) => {
      acc[key.toLowerCase()] = value;
      return acc;
    }, {});

    return this;
  }

  genList(args = {}) {
    Object.assign(this.$generateList, args);
    Object.assign(this.$generateListProps, args);
    return this;
  }

  genListSettings(args = {}) {
    Object.assign(this.$generateListProps, args);
    return this;
  }

  genDetail(args = {}) {
    Object.assign(this.$generateDetail, args);
    return this;
  }

  genDetailSettings(args = {}) {
    Object.assign(this.$generateDetailProps, args);
    return this;
  }

  build() {
    return generateCollection({
      ...this.$meta,
      PageDetail: generateDetail(this.$generateDetail),
      PageDetailProps: this.$generateDetailProps,
      PageList: generateList(this.$generateList),
      PageListProps: this.$generateListProps,
    });
  }
}
