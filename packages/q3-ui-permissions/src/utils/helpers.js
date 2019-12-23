import minimatch from 'minimatch';

export const filterbyColl = (a, name) =>
  a.filter((v) => v.coll.localeCompare(name) === 0);

export const findByOp = (a, op) =>
  a && a.length ? a.find((grant) => grant.op === op) : null;

export const isDefined = (arg) =>
  arg !== undefined && arg !== null;

export const satisfiesOwnership = (grant, id, createdBy) =>
  grant &&
  grant.ownership === 'Own' &&
  grant.op !== 'Create'
    ? id === createdBy
    : true;

export const hasField = (grant, name) =>
  grant && grant.fields && typeof grant.fields === 'string'
    ? grant.fields.split(',').every((i) => {
        try {
          if (i === '*') return true;
          return minimatch(name, i.trim());
        } catch (e) {
          return false;
        }
      })
    : false;
