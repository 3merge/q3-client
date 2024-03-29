import { get, last } from 'lodash';

const compareIds = (a, b) => String(a.id) === String(b);

export default class OpsHelper {
  constructor(data, collection) {
    this.$__collection = collection;
    this.$__store = data;
  }

  addDataMeta(obj = {}) {
    const { id } = last(this.$__store);
    const newId = Number(id) + 1;
    return Object.assign(obj, {
      id: newId,
      photo: 'https://source.unsplash.com/random',
    });
  }

  getIdFromUrl(url) {
    return url.split(`/${this.$__collection}/`)[1];
  }

  findById(id) {
    return this.$__store.find((item) =>
      compareIds(item, id),
    );
  }

  findByNestedId(url) {
    return this.getIdFromUrl(url).split('/');
  }

  filterBy(id) {
    return this.$__store.filter((item) =>
      compareIds(item, id),
    );
  }

  mapById(id, data) {
    return this.$__store.map((item) =>
      compareIds(item, id) ? data : item,
    );
  }

  onCreate(d) {
    const record = this.addDataMeta(JSON.parse(d));
    this.$__store.push(record);
    return record;
  }

  getData(keyName, { url }) {
    const out = this.findById(this.getIdFromUrl(url));
    return {
      [keyName]: out,
    };
  }

  patchData(keyName, { url, data }) {
    const id = this.getIdFromUrl(url);
    const init = this.findById(id);
    const doc = Object.assign(init, JSON.parse(data));
    this.$__store = this.mapById(id, doc);

    return {
      [keyName]: doc,
      message:
        'This is a long success message that needs to wrap onto multiple lines.',
    };
  }

  getNestedData(keyName, { url }) {
    const [sub] = this.findByNestedId(url);
    const out = get(this.findById(sub), keyName);
    return {
      [keyName]: out,
    };
  }
}
