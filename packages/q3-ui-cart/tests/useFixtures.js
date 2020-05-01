const genProduct = ({ product, quantity }) => ({
  product,
  quantity,
  name: product,
  label: 'Product label',
  price: 12.11,
  description:
    'This is a small blurb about the product. It will be truncated if it goes on longer than it should.',
  img:
    'https://images.unsplash.com/photo-1580793210854-d22f57782c62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
});

export default () => {
  const order = { items: [] };

  return {
    order,

    updateOrder: (args) => {
      Object.assign(order, args);
      return Promise.resolve(order);
    },

    clear: () => {
      order.title = '';
      order.items = [];
      return Promise.resolve(order);
    },

    addItemToOrder: (args) => {
      order.items.push(genProduct(args));
      return Promise.resolve(order);
    },

    updateItemInOrder: (args) => {
      Object.assign(order.items[0], args);
      return Promise.resolve(order);
    },

    removeItemInOrder: () => {
      order.items = [];

      return Promise.resolve(order);
    },

    pollOrder: () => Promise.resolve(order),
  };
};
