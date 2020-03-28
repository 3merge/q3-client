import React from 'react';
import { CsvDownloadI18Implementation } from '../DataToCsv';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn().mockImplementation((v) => v.toUpperCase()),
  }),
}));

describe('DataToCsv', () => {
  it('should cast all object keys', () => {
    const El = CsvDownloadI18Implementation([
      {
        label: 1,
        nested: {
          label: 2,
        },
      },
    ]);

    const [row] = global
      .shallow(<El onClick={jest.fn()} />)
      .props().data;

    expect(row).toMatchObject({
      LABEL: 1,
      'NESTED.LABEL': 2,
    });
  });
});
