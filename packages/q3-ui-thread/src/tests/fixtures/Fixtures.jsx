import React from 'react';
import ApiMock from './Api';
import AuthMock from './Auth';
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
