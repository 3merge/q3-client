import useTimelineEntry from './useTimelineEntry';

test.each([
  [{ added: { foo: 1 } }, 'added'],
  [{ deleted: { foo: 1 } }, 'deleted'],
  [{ updated: { foo: 1 } }, 'updated'],
  [{}, 'updated'],
])('useTimelineEntry().text', (props, expected) => {
  expect(useTimelineEntry(props).text).toMatch(expected);
});

test.each([
  [{ updated: { foo: 1 } }, '--'],
  [{ updated: { price: { foo: 1 } } }, 'Price'],
  [
    { updated: { price: { override: { foo: 1 } } } },
    'Override',
  ],
  [
    {
      updated: {
        price: { override: { lastModified: { foo: 1 } } },
      },
    },
    'Lastmodified',
  ],
  [null, '--'],
])('useTimelineEntry().getEntity()', (props, expected) => {
  expect(useTimelineEntry(props).getEntity()).toMatch(
    expected,
  );
});

test.each([
  [{ added: { foo: 1 } }, 'added', { foo: 1 }],
  [{ deleted: { foo: 1 } }, 'updated', {}],
])(
  'useTimelineEntry().getValue()',
  (props, param, expected) => {
    expect(
      useTimelineEntry(props).getValue(param),
    ).toMatchObject(expected);
  },
);

test.each([
  [{ added: { foo: 1 } }, {}],
  [
    { previous: { foo: 1 }, updated: { foo: 1 } },

    { foo: 1 },
  ],
  [{ updated: { foo: 1 } }, {}],
  [{ deleted: { foo: 1 } }, { foo: 1 }],
  [null, {}],
])(
  'useTimelineEntry().getPreviousValue()',
  (props, expected) => {
    expect(
      useTimelineEntry(props).getValue(),
    ).toMatchObject(expected);
  },
);

test.each([
  [{ added: { foo: 1 } }, { foo: 1 }],
  [{ deleted: { foo: 1 } }, {}],
])(
  'useTimelineEntry().getCurrentValue()',
  (props, expected) => {
    expect(
      useTimelineEntry(props).getValue(),
    ).toMatchObject(expected);
  },
);

test.each([
  [null, undefined],
  [undefined, undefined],
  ['', undefined],
  [{ foo: 1 }, JSON.stringify({ foo: 1 }, null, 2)],
])('useTimelineEntry().format()', (props, expected) => {
  expect(useTimelineEntry({}).format(props)).toEqual(
    expected,
  );
});
