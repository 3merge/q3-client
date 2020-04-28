import {
  getFirstLetterOfCard,
  getFullName,
  mockEncryptedCreditCardNumber,
} from './CreditCard';

describe('CreditCard', () => {
  it('should return Amex', () => {
    expect(getFirstLetterOfCard('AS')).toBe(34);
  });

  it('should return Visa', () => {
    expect(getFirstLetterOfCard('VI')).toBe(4);
  });

  it('should return MasterCard', () => {
    expect(getFirstLetterOfCard('MC')).toBe(5);
  });

  it('should return first name', () => {
    expect(getFullName('Mike')).toBe('Mike');
  });

  it('should return full name', () => {
    expect(getFullName('Mike', 'Ibberson')).toBe(
      'Mike Ibberson',
    );
  });

  it('should return mock CC name', () => {
    expect(
      mockEncryptedCreditCardNumber('VI', '1234'),
    ).toBe('4***********1234');
  });
});
