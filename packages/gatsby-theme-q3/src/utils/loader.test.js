import loader, { templates } from './loader';

const { length } = templates;

describe('Loader', () => {
  it('should throw an error', () => {
    expect(() => loader()).toThrowError();
  });

  it('should resolve callback', async () => {
    const next = jest.fn();
    expect(await loader(next)).toHaveLength(length);
    expect(next.mock.calls).toHaveLength(length);
  });
});
