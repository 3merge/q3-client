const {
  genCursor,
  appendSiblingsToContext,
  getPreviousArchiveUrl,
  getNextArchiveUrl,
  getNumberOfPages,
  paginateArchiveContext,
} = require('../pagination');

const genEntries = () => {
  const entries = [];
  for (let i = 0; i < 30; i += 1) entries.push(i);
  return entries;
};

describe('pagination', () => {
  describe('"genCursor"', () => {
    const stub = ['foo', 'bar', 'quuz', 'garply'];
    const cursor = genCursor(stub, 2);
    // current index targets "quuz"

    it('should identify first item', () => {
      expect(cursor.first).toMatch('foo');
    });

    it('should identify last item', () => {
      expect(cursor.last).toMatch('garply');
    });

    it('should identify next item', () => {
      expect(cursor.next).toMatch('garply');
    });

    it('should identify previous item', () => {
      expect(cursor.prev).toMatch('bar');
    });

    it('should identify first position', () => {
      expect(cursor.isFirst).toBeFalsy();
      expect(genCursor(stub, 0).isFirst).toBeTruthy();
    });

    it('should identify last position', () => {
      expect(cursor.isLast).toBeFalsy();
      expect(genCursor(stub, 3).isLast).toBeTruthy();
    });
  });

  describe('"appendSiblingsToContext"', () => {
    const mockContentfulEntry = (id) => ({
      contentful_id: id,
    });

    const stubWithContentful = [
      mockContentfulEntry(1),
      mockContentfulEntry(2),
      mockContentfulEntry(3),
    ];

    it('should map contentful entries using cursor', () => {
      const entries = appendSiblingsToContext(
        stubWithContentful,
      );
      expect(entries[0]).toMatchObject({
        prev: 3,
        next: 2,
      });
      expect(entries[2]).toMatchObject({
        prev: 2,
        next: 1,
      });
    });
  });

  describe('"getPreviousArchiveUrl"', () => {
    it('should return null', () => {
      expect(getPreviousArchiveUrl('/foo', 1)).toBeNull();
    });

    it('should return archive', () => {
      expect(getPreviousArchiveUrl('/foo', 2)).toEqual(
        '/foo',
      );
    });

    it('should return archive sub-directory', () => {
      expect(getPreviousArchiveUrl('/foo', 3)).toEqual(
        '/foo/2',
      );
    });
  });

  describe('"getNextArchiveUrl"', () => {
    it('should return sub-directory', () => {
      expect(getNextArchiveUrl('/foo', 8, 9)).toEqual(
        '/foo/9',
      );
    });

    it('should return null', () => {
      expect(getNextArchiveUrl('/foo', 9, 9)).toBeNull();
    });
  });

  describe('"getNumberOfPages"', () => {
    it('should return number divisible by', () => {
      expect(getNumberOfPages(genEntries(), 5)).toBe(6);
    });
  });

  describe('"paginateArchiveContext"', () => {
    it('should return pagination meta', () => {
      // default 15 per page
      const res = paginateArchiveContext(
        genEntries(),
        '/foo',
      );

      expect(res).toHaveLength(2);
      expect(res[0]).toMatchObject({
        path: '/foo',
        limit: 15,
        skip: 0,
        pageNum: 0,
        prev: null,
        next: '/foo/2',
      });

      expect(res[1]).toMatchObject({
        path: '/foo/2',
        limit: 15,
        skip: 15,
        pageNum: 1,
        prev: '/foo',
        next: null,
      });
    });
  });
});
