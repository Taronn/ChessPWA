import { t } from 'i18next';

export function validateUsername(username: string): string {
  if (username.length < 5) {
    return t('Errors.USERNAME_LENGTH');
  }
  if (!username.match(/^[a-z0-9._]+$/)) {
    return t('Errors.USERNAME_INVALID');
  }
  return '';
}

export function validateEmail(email: string): string {
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return t('Errors.EMAIL_INVALID');
  }
  return '';
}

export function validatePassword(password: string): string {
  if (password.length < 8) {
    return t('Errors.PASSWORD_MIN_LENGTH');
  }
  if (!password.match(/[A-Z]/)) {
    return t('Errors.PASSWORD_UPPERCASE');
  }
  if (!password.match(/[0-9]/)) {
    return t('Errors.PASSWORD_NUMBER');
  }
  if (!password.match(/[a-z]/)) {
    return t('Errors.PASSWORD_LOWERCASE');
  }
  return '';
}

export function validatePasswordMatch(
  password: string,
  confirmPassword: string
): string {
  return password !== confirmPassword ? t('Errors.PASSWORD_NOT_MATCH') : '';
}
