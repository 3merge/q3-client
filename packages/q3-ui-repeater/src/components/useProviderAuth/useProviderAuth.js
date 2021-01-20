import { useAuth } from 'q3-ui-permissions';

export default ({ collectionName, name, ...rest }) => {
  const auth = useAuth(collectionName);
  return Object.entries({
    disable: ['canSeeSub'],
    disableCreate: ['canCreateSub'],
    disableEditor: ['canEditSub'],
    disableMultiselect: ['canDeleteSub', 'canEditSub'],
    disableRemove: ['canDeleteSub'],
  }).reduce(
    (acc, [key, value]) => {
      acc[key] =
        rest[key] ||
        value.every((method) => !auth[method](name));
      return acc;
    },
    {
      auth,
      collectionName,
    },
  );
};
