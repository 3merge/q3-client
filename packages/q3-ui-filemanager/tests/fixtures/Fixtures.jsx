import React from 'react';
import Container from '@material-ui/core/Container';
import { isFunction } from 'lodash';
import AuthMock from './AuthMock';
import ApiMock from './ApiMock';
import { collectionName, id } from './meta';

// eslint-disable-next-line
const Fixtures = ({ children, ...rest }) => {
  const StoryOrTest = (injectedProps) =>
    isFunction(children)
      ? children({
          ...injectedProps,
          collectionName,
          id,
        })
      : React.cloneElement(children, {
          ...injectedProps,
          collectionName,
          id,
        });

  return (
    <Container style={{ paddingTop: '1rem' }}>
      <AuthMock {...rest}>
        <ApiMock {...rest}>
          <StoryOrTest />
        </ApiMock>
      </AuthMock>
    </Container>
  );
};

export default Fixtures;
