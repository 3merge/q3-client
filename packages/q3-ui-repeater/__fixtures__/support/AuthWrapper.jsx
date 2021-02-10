import React from 'react';
import Box from '@material-ui/core/Box';
import { AuthContext } from 'q3-ui-permissions';
import { COLLECTION_NAME, permissions } from '../seed';
import rows from '../seed/products';

const genResolver = (fn) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, 500);
  });

export default (Component) => (props) => {
  const [initialValues, setInitialValues] = React.useState([
    ...rows,
    ...rows,
    ...rows,
  ]);

  const nextStateWithNewProp = (nextState) => {
    setInitialValues(nextState);
    return {
      ...nextState,
      newProp: true,
    };
  };

  const onCreate = (values) =>
    genResolver(() => {
      const nextState = [
        ...initialValues,
        {
          id: Number(initialValues.length) + 1,
          ...values,
        },
      ];

      setInitialValues(nextState);
      return nextState;
    });

  const onRemove = (id) => () =>
    genResolver(() => {
      const nextState = initialValues.filter(
        (v) => v.id !== id,
      );

      setInitialValues(nextState);
      return nextState;
    });

  const onRemoveBulk = (ids) => () =>
    genResolver(() => {
      const nextState = initialValues.filter(
        (v) => !ids.includes(v.id),
      );

      setInitialValues(nextState);
      return nextState;
    });

  const onUpdateBulk = (ids) => (values) =>
    genResolver(() =>
      nextStateWithNewProp(
        initialValues.map((v) => {
          if (ids.includes(v.id))
            return { ...v, ...values };
          return v;
        }),
      ),
    );

  const onUpdate = (id) => (values) =>
    genResolver(() =>
      nextStateWithNewProp(
        initialValues.map((v) => {
          if (v.id === id) return values;
          return v;
        }),
      ),
    );

  return (
    <AuthContext.Provider value={permissions}>
      <Box p={2} style={{ backgroundColor: '#FFF' }}>
        <Component
          name="people"
          collectionName={COLLECTION_NAME}
          data={initialValues}
          create={onCreate}
          edit={onUpdate}
          editBulk={onUpdateBulk}
          remove={onRemove}
          removeBulk={onRemoveBulk}
          initialValues={{
            firstName: '',
            lastName: '',
            age: '',
            position: '',
            company: '',
            trained: false,
          }}
          {...props}
        />
      </Box>
    </AuthContext.Provider>
  );
};
