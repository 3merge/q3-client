import React from 'react';
import PropTypes from 'prop-types';

const UploadMock = ({ children, causeError, ...props }) => {
  const [done, setDone] = React.useState();

  const upload = (values) =>
    causeError
      ? Promise.reject(new Error('Whoops...'))
      : Promise.resolve().then(() => {
          setDone(
            values.featuredUpload === null
              ? null
              : 'https://images.unsplash.com/photo-1657299156075-12b8c0a2da38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
          );
        });

  const StoryOrTest = (injectedProps) => {
    const newProps = {
      upload,
      ...props,
      ...injectedProps,
    };

    if (done !== undefined) newProps.src = done;
    return React.cloneElement(children, newProps);
  };

  return <StoryOrTest />;
};

UploadMock.defaultProps = {
  causeError: false,
};

UploadMock.propTypes = {
  causeError: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

export default UploadMock;
