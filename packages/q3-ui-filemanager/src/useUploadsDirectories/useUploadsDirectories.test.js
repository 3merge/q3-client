import React from 'react';
import data from '../../tests/fixtures/data';
import useUploadsDirectories from './useUploadsDirectories';

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue(data);
});

describe('useUploadsDirectories', () => {
  it('should organize into folders', () => {
    const output = useUploadsDirectories();
    expect(output).toMatchObject(
      expect.objectContaining({
        __null__: [
          expect.objectContaining({
            'name': 'changlog.csv',
          }),
          expect.objectContaining({
            'name': 'README.md',
          }),
        ],
        media: {
          __media__: [
            expect.objectContaining({
              'name': 'FeaturedPhoto.png',
            }),
            expect.objectContaining({
              'name': 'VacationPic.jpg',
            }),
          ],
        },
        docs: {
          __docs__: [
            expect.objectContaining({
              'name': 'Returns.docx',
            }),
            expect.objectContaining({
              'name': 'AssemblyInstructions.pdf',
            }),
          ],
          archives: {
            __archives__: [
              expect.objectContaining({
                'name': 'Warranties.png',
              }),
            ],
          },
        },
      }),
    );
  });
});
