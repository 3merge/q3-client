import React from 'react';
import * as i18next from 'react-i18next';
import TimelineEntry, {
  convertNestedPath,
} from './TimelineEntry';
import TimelineCode from '../TimelineCode';

const t = jest.fn();

jest
  .spyOn(i18next, 'useTranslation')
  .mockImplementation(() => ({ t }));

afterEach(() => jest.clearAllMocks());

describe('TimelineEntry', () => {
  it('should return empty without data', () => {
    expect(
      global.shallow(<TimelineEntry />).isEmptyRender(),
    ).toBeTruthy();
  });

  it('should return fields if changes under length', () => {
    const data = {
      updatedFields: {
        achievement: [{ description: 'England' }],
        seasons: Array(15).fill(1),
      },
    };
    const res = global.shallow(
      <TimelineEntry data={data} />,
    );

    expect(res.find(TimelineCode).exists()).toBeTruthy();
  });

  it('should return bulk op message', () => {
    const data = {
      updatedFields: {
        achievement: [{ description: 'England' }],
        seasons: Array(21).fill(1),
      },
    };
    global.shallow(<TimelineEntry data={data} />);
    expect(t).toHaveBeenCalledTimes(1);
  });

  it('should replace array dot notation with positional characters ($)', () => {
    expect(convertNestedPath('foo.5.bar.8')).toBe(
      'foo.$.bar.$',
    );
  });
});
