import React from 'react';
import { storiesOf } from '@storybook/react';
import Cart from '.';

storiesOf('Components|Cart', module)
  .add('Cart empty', () => <Cart updated="2019-02-01" />)
  .add('Cart full', () => (
    <Cart
      updated="2019-02-01"
      total={12}
      items={[
        {
          rebate: {
            quantity: 1,
            value: 10,
            description:
              'Here is a rebate you should know about...',
          },
          note: {
            description:
              'Here is a rebate you should know about...',
          },
          quantity: 2,
          sku: 'ABC20139',
          attribute: 'Small',
          price: '$24.00',
          imgSrc:
            'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png?v=1530129113',
        },
        {
          quantity: 2,
          sku: 'ABC20139',
          attribute: 'Small',
          price: '$24.00',
          imgSrc:
            'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png?v=1530129113',
        },
        {
          note: {
            description:
              'Here is a rebate you should know about...',
          },
          quantity: 2,
          sku: 'ABC20139',
          price: '$24.00',
          attribute: 'Small',
          imgSrc:
            'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png?v=1530129113',
        },
        {
          quantity: 2,
          sku: 'ABC20139',
          price: '$24.00',
          attribute: 'Small',
          imgSrc:
            'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png?v=1530129113',
        },
        {
          rebate: {
            quantity: 1,
            value: 10,
            description:
              'Here is a rebate you should know about...',
          },
          quantity: 2,
          sku: 'ABC20139',
          price: '$24.00',
          attribute: 'Small',
          imgSrc:
            'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png?v=1530129113',
        },
      ]}
    />
  ));
