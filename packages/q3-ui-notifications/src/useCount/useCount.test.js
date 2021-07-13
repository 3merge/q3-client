import useCount from './useCount';

describe('"useCount"', () => {
  const checkActive = (stub) =>
    expect(useCount([stub]).active);

  it('should return truthy when seen but not downloaded', () =>
    checkActive({
      hasDownloaded: false,
    }).toBeTruthy());

  it('should return truthy when unseen', () =>
    checkActive({
      hasSeen: false,
    }).toBeTruthy());

  it('should return falsy when seen or downloaded is true', () =>
    checkActive({
      hasSeen: true,
      hasDownloaded: true,
    }).toBeFalsy());
});
