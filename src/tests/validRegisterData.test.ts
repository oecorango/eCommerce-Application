import { EMAIL_ERROR, PASSWORD_ERROR } from '../constants/errors';
import { validAuthData } from '../utils/validAuthData';
import { isOldEnough } from '../utils/validRegisterData';

describe('isOldEnough function', () => {
  it('should return true if the input date is 13 years ago', () => {
    const thirteenYearsAgo = new Date();
    thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);

    expect(isOldEnough(thirteenYearsAgo)).toBe(true);
  });

  it('should return false if the input date is less than 13 years ago', () => {
    const twelveYearsAgo = new Date();
    twelveYearsAgo.setFullYear(twelveYearsAgo.getFullYear() - 12);

    expect(isOldEnough(twelveYearsAgo)).toBe(false);
  });

  it('should return true if the input date is more than 13 years ago', () => {
    const fourteenYearsAgo = new Date();
    fourteenYearsAgo.setFullYear(fourteenYearsAgo.getFullYear() - 14);

    expect(isOldEnough(fourteenYearsAgo)).toBe(true);
  });

  it('should return false if the input date is a future date', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    expect(isOldEnough(futureDate)).toBe(false);
  });

  it('should return false if the input is not a valid date', () => {
    expect(isOldEnough('invalidDate')).toBe(false);
  });
});

describe('validAuthData', () => {
  it('should validate a valid email and password', async () => {
    const validData = {
      email: 'test@example.com',
      password: 'Password123',
    };

    await expect(validAuthData.isValid(validData)).resolves.toBe(true);
  });

  it('should fail if email is missing', async () => {
    const invalidData = {
      password: 'Password123',
    };

    await expect(validAuthData.isValid(invalidData)).resolves.toBe(false);
  });

  it('should fail if password is missing', async () => {
    const invalidData = {
      email: 'test@example.com',
    };

    await expect(validAuthData.isValid(invalidData)).resolves.toBe(false);
  });

  it('should fail if email is invalid', async () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'Password123',
    };

    await expect(validAuthData.isValid(invalidData)).resolves.toBe(false);
    await expect(validAuthData.validate(invalidData)).rejects.toThrow(
      EMAIL_ERROR.error,
    );
  });

  it('should fail if password is too short', async () => {
    const invalidData = {
      email: 'test@example.com',
      password: 'Pass123',
    };

    await expect(validAuthData.isValid(invalidData)).resolves.toBe(false);
    await expect(validAuthData.validate(invalidData)).rejects.toThrow(
      PASSWORD_ERROR.minLengthText,
    );
  });
});
