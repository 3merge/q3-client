import generateList from './generateList';
import generateDetail from './generateDetail';
import generateCollection from './generateCollection';
import generateToolbar from './generateToolbar';
import AddNewFormUtils from '../components/AddNewFormUtils';

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
    this.$generateToolbarProps = {};
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
    this.$generateToolbarProps.addComponent = component;
    this.$generateToolbarProps.addComponentWrapper =
      AddNewFormUtils;

    // eslint-disable-next-line
    console.warn(
      // eslint-disable-next-line
      `You should use .genCreate instead of .genNew for the latest features`,
    );
    return this;
  }

  genCreate(component) {
    this.$generateToolbarProps.addComponent = component;
    return this;
  }

  genFilter(component) {
    this.$generateList.filterComponent = component;
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
      Toolbar: generateToolbar(this.$generateToolbarProps),
    });
  }
}
