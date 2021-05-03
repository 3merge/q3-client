import toEmbed from './toEmbed';

test.each([
  [
    'http://home.wistia.com/medias/e4a27b971d',
    'http://fast.wistia.net/embed/iframe/e4a27b971d?version=v1',
  ],
  [
    'https://www.youtube.com/watch?v=I1188GO4p1E',
    'http://www.youtube.com/embed/I1188GO4p1E',
  ],
])('.toEmbed(%s)', (a, expected) => {
  expect(toEmbed(a)).toBe(expected);
});
