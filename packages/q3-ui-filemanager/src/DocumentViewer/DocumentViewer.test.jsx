import React from 'react';
import DocumentViewer from '.';

describe('DocumentViewer', () => {
  it('should add click function', () => {
    const setState = jest.fn();
    let stub = [{ id: 1 }];

    jest
      .spyOn(React, 'useState')
      .mockReturnValue([undefined, setState]);

    global.shallow(
      <DocumentViewer>
        {(appendViewerClickToEach) => {
          stub = appendViewerClickToEach(stub);
          return null;
        }}
      </DocumentViewer>,
    );

    stub[0].onClick();
    expect(setState).toHaveBeenCalledWith({
      id: 1,
    });
  });
});
