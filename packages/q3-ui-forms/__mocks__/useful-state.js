export const useOpen = jest.fn().mockReturnValue({});
export const useToggle = jest.fn().mockReturnValue({});

export const useValue = jest.fn(() => ({
  onChange: jest.fn(),
  value: 'foo',
}));
