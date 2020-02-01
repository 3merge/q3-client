import { getSizing } from '.';

describe('ProjectCard', () => {
  it('should assign default sizing keys', () =>
    expect(getSizing()).toMatchObject({
      md: expect.any(Number),
      sm: expect.any(Number),
      xs: expect.any(Number),
    }));

  it('should remove sizing keys on fullWidth', () => {
    const out = getSizing(true);
    expect(out).not.toHaveProperty('sm');
    expect(out).not.toHaveProperty('md');
  });
});
