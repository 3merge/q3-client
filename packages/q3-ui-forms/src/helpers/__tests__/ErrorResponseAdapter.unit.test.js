import ErrorResponseAdapter from '../ErrorResponseAdapter';

const SERVER_MSG = 'Validation failed';
const ERROR_MSG = 'Whoopie';

const generatePayload = (key) => ({
  message: 'Failed',
  errors: {
    key,
  },
});

const expectStructuredOutput = () =>
  expect([
    {
      key: ERROR_MSG,
    },
    SERVER_MSG,
  ]).toEqual([{ key: ERROR_MSG }, SERVER_MSG]);

describe('ErrorResponse', () => {
  it('should return an empty array', () => {
    expect(ErrorResponseAdapter()).toEqual([]);
  });

  it('should return errors and message', () => {
    expectStructuredOutput(
      ErrorResponseAdapter(
        generatePayload({
          properties: {
            message: ERROR_MSG,
          },
        }),
      ),
    );
  });

  it('should return nested errors and message', () => {
    expectStructuredOutput(
      ErrorResponseAdapter({
        data: generatePayload({
          msg: ERROR_MSG,
        }),
      }),
    );
  });

  it('should return nested response errors and message', () => {
    expectStructuredOutput(
      ErrorResponseAdapter({
        response: {
          data: {
            message: generatePayload({
              message: ERROR_MSG,
            }),
          },
        },
      }),
    );
  });
});
