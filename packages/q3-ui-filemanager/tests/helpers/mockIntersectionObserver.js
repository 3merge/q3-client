const mockIntersectionObserver = () => {
  const mock = jest.fn();
  mock.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });

  window.IntersectionObserver = mock;
  return mock;
};

export default mockIntersectionObserver;
