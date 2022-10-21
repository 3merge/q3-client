jest.mock('q3-ui-locale', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest
      .fn()
      .mockImplementation((v) =>
        String(v).includes(':') ? v.split(':')[1] : v,
      ),
  }),
}));
