import usePaperWidth, {
  standard,
  slim,
} from './usePaperWidth';

describe('usePaperWidth', () => {
  it('should return standard by default', () => {
    expect(usePaperWidth()).toBe(standard);
  });

  it('should return slim for collapsed', () => {
    expect(usePaperWidth('collapsed')).toBe(slim);
  });

  it('should return stanard + slim for railed', () => {
    expect(usePaperWidth('railed')).toBe(standard + slim);
  });

  it('should return standard for stacked', () => {
    expect(usePaperWidth('stacked')).toBe(standard);
  });
});
