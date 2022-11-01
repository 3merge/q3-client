import { getFileType } from '../utils';

test.each([
  [
    'https://3merge-sandbox-private.s3.us-east-2.amazonaws.com/633ef4fff0e3b19e448a9ab5/Screen%20Shot%202022-06-07%20at%2010.25.44%20AM%20%282%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=1%2F20221014%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20221014T173414Z&X-Amz-Expires=86400&X-Amz-Signature=b9d750d68b0eae253ec2c84dae133b02bf3bd4b79b92e57069933da477db5ca5&X-Amz-SignedHeaders=host',
    'png',
  ],
  ['https://images.google.ca/example.png', 'png'],
  ['/relativepath.pdf', null],
])('.getFileType(%s)', (a, b) => {
  expect(getFileType(a)).toBe(b);
});
