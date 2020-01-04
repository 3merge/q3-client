import React from 'react';
import { storiesOf } from '@storybook/react';
import Title from '.';

storiesOf('Components|Tile', module).add(
  'Default render',
  () => (
    <div style={{ display: 'flex' }}>
      <Title
        title="lorem"
        subtitle={`
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer laoreet ac urna et viverra. Nunc sit amet condimentum ipsum, sed rhoncus enim. Vivamus non elit eleifend, placerat quam vitae, dictum sem. Cras viverra tortor felis, vitae maximus enim faucibus vitae. Etiam a tincidunt lacus, commodo posuere magna. Duis quis consequat lacus. Mauris suscipit neque eu lacus tincidunt, sit amet iaculis mauris interdum. Duis faucibus pretium convallis.</p>
          <p>Sed ultrices lacinia efficitur. Ut consectetur, nibh at condimentum sollicitudin, turpis arcu vulputate dui, et sollicitudin felis justo quis nibh. Nulla quis vehicula erat. Morbi sed vehicula leo. Pellentesque id tellus eu sem luctus imperdiet sit amet quis elit. Vivamus ornare semper arcu, a laoreet nisi tincidunt et. Aenean tincidunt ex in dictum bibendum. Sed quis imperdiet erat. Etiam hendrerit mauris massa.</p>
        `}
      />
    </div>
  ),
);
