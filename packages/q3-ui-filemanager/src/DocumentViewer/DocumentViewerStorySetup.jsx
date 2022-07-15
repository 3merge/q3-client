import React from 'react';
import DocumentViewer from './DocumentViewer';
import { uploads } from '../../tests/fixtures/data';

// eslint-disable-next-line
export default ({ index = 0 }) => (
  <div>
    <p>Background content</p>
    <DocumentViewer>
      {(append) => {
        React.useEffect(() => {
          append(uploads)[index].onClick({
            preventDefault: () => null,
            stopPropagation: () => null,
          });
        }, []);
        return null;
      }}
    </DocumentViewer>{' '}
  </div>
);
