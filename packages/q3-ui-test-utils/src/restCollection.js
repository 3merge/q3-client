import React from 'react';

const seedData = {
  id: 1,
  version: 0,
  firstName: 'Norman',
  lastName: 'Bates',
  age: 18,
  company: 'Motel',
  position: 'Reception',
  trained: true,
  friends: [
    {
      id: 1,
      name: 'Dylan Massett',
      relationship: 'Brother',
    },
    {
      id: 2,
      name: 'Emma Decody',
      relationship: 'Girlfriend',
    },
  ],
};

const genResolver = (fn) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, 500);
  });

export default () => {
  const [initialValues, setInitialValues] = React.useState(
    seedData,
  );

  const onGet = () => initialValues;
  const onGetSub = () => initialValues.friends;

  const onCreateSub = (values) => {
    const nextState = {
      ...initialValues,
      friends: [
        ...initialValues.friends,
        {
          id: Number(initialValues.friends.length) + 1,
          ...values,
        },
      ],
    };
    setInitialValues(nextState);
    return nextState.friends;
  };

  const onRemoveSub = (id) => {
    const nextState = {
      ...initialValues,
      friends: initialValues.friends.filter(
        (v) => v.id !== id,
      ),
    };

    setInitialValues(nextState);
    return nextState.friends;
  };

  const onUpdate = () => (values) =>
    genResolver(() => {
      const nextState = {
        ...initialValues,
        ...values,
      };

      setInitialValues(nextState);
      return nextState;
    });

  const onUpdateSub = (id) => (values) => {
    const nextState = {
      ...initialValues,
      version: initialValues.version + 1,
      friends: initialValues.friends.map((v) => {
        if (String(v.id) === String(id)) return values;
        return v;
      }),
    };

    setInitialValues(nextState);
    return nextState.friends;
  };

  return {
    onCreateSub,
    onGetSub,
    onUpdateSub,
    onRemoveSub,
    onGet,
    onUpdate,
  };
};
