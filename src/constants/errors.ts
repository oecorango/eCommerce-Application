export const AUTHENTICATE_ERROR = 'Email or password is incorrect';
export const PASSWORD_ERROR = {
  minLength: 8,
  maxLength: 20,
  minLengthText: 'Minimum 8 characters',
  maxLengthText: 'Maximum 20 characters',
  oneNumber: 'Password must contain at least one number',
  oneUpperCase: 'Password must contain at least one uppercase',
  oneLowerCase: 'Password must contain at least one lowercase',
  leadingSpace: 'Password must not contain leading whitespace',
  trailingSpace: 'Password must not contain trailing whitespace',
  latinLetters: 'Password must contain only latin letters',
};
export const EMAIL_ERROR = {
  error: 'email must be a valid email',
};
