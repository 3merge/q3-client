export const slugify = (v, id) =>
  id ? `/${v}/${id}` : `/${v}`;

export const invokeFnWithCallback = (fn, args, done) => {
  if (typeof fn === 'function') {
    const f = fn(args);
    if (f && (f instanceof Promise || 'then' in f)) {
      f.then(done);
    } else {
      done();
    }
  }
};
