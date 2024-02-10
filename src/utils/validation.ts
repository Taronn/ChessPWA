export function validateUsername(username: string): string {
  if (username.length < 5) {
    return 'Username must be at least 5 characters';
  }
  if (!username.match(/^[a-z0-9._]+$/)) {
    return 'Username must contain only lowercase, numbers, _, and .';
  }
  return '';
}

export function validateEmail(email: string): string {
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return 'Please enter a valid email';
  }
  return '';
}

export function validatePassword(password: string): string {
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!password.match(/[A-Z]/)) {
    return 'Password must contain at least one uppercase';
  }
  if (!password.match(/[0-9]/)) {
    return 'Password must contain at least one number';
  }
  if (!password.match(/[a-z]/)) {
    return 'Password must contain at least one lowercase';
  }
  return '';
}

export function validatePasswordMatch(
  password: string,
  confirmPassword: string
): string {
  return password !== confirmPassword ? 'Passwords do not match' : '';
}
