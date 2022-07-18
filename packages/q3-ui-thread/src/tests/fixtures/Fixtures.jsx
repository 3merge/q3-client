import React from 'react';
// often rendered as dialog
import Container from '@material-ui/core/Container';
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
    <Container maxWidth="sm">
      <AuthMock {...rest}>
        <ApiMock {...rest}>
          <StoryOrTest />
        </ApiMock>
      </AuthMock>
    </Container>
  );
};

export default Fixtures;
