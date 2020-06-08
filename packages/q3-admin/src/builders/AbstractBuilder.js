import generateLazyComponent from './generateLazyComponent';
import generateList from './generateList';
import generateDetail from './generateDetail';
import generateCollection from './generateCollection';

export default class Collection {
  constructor({
    icon,
    resourceName,
    resourceNameSingular,
    collectionName,
  }) {
    // eslint-disable-next-line
    if (!collectionName) collectionName = resourceName;

    this.$meta = {
      icon,
      resourceNameSingular,
      resourceName,
      collectionName,
    };

    this.$generateDetail = {};
    this.$generateList = {};
    this.$generateDetailProps = {};
    this.$generateListProps = {};
  }

  genHeader(args = {}) {
    this.$generateDetail.HeaderProps = args;
    return this;
  }

  genNew(component, onNew) {
    this.$generateList.addComponent = generateLazyComponent(
      component,
    );

    this.$generateList.onNew = onNew;
    return this;
  }

  genFilter(component) {
    this.$generateList.filterComponent = generateLazyComponent(
      component,
    );
    return this;
  }

  genViews(views = {}) {
    this.$generateDetail.views = Object.entries(
      views,
    ).reduce((acc, [key, value]) => {
      acc[key] = generateLazyComponent(value);
      return acc;
    }, {});

    return this;
  }

  genList(args = {}) {
    Object.assign(this.$generateList, args);
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
