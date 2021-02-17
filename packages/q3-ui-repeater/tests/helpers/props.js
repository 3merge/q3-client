import data from '../fixtures/articles';

export const genRepeaterProps = () => {
  const editSub = jest.fn().mockResolvedValue({});
  const removeSub = jest.fn().mockResolvedValue({});

  return {
    editSub,
    removeSub,
    create: jest.fn(),
    edit: jest.fn().mockReturnValue(editSub),
    editBulk: jest.fn(),
    remove: jest.fn().mockReturnValue(removeSub),
    removeBulk: jest.fn().mockReturnValue(jest.fn()),
    poll: jest.fn(),
    initialValues: {
      foo: '',
    },
    cardProps: {
      title: 'title',
      description: 'description',
      attributes: ['publishedDate', 'author'],
      editable: {
        author: {
          type: 'text',
        },
      },
    },
    data,
  };
};
