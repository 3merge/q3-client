import React from 'react';
import AuthMock from './AuthMock';
import ApiMock from './ApiMock';
import { collectionName, id } from './meta';

// eslint-disable-next-line
const Fixtures = ({ children, ...rest }) => {
  const StoryOrTest = (injectedProps) =>
    React.cloneElement(children, {
      ...injectedProps,
      collectionName,
      id,
    });

  return (
    <AuthMock {...rest}>
      <ApiMock {...rest}>
        <StoryOrTest />
      </ApiMock>
    </AuthMock>
  );
};

export default Fixtures;
