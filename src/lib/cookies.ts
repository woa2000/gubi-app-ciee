interface CookieOptions {
  days?: number;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
}

export const setCookie = (
  name: string, 
  value: string, 
  options: CookieOptions = {}
): void => {
  const {
    days = 7,
    secure = true,
    sameSite = 'strict',
    httpOnly = false
  } = options;

  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  const cookieString = [
    `${name}=${value}`,
    `expires=${expires}`,
    'path=/',
    secure ? 'secure' : '',
    `samesite=${sameSite}`,
    httpOnly ? 'httponly' : ''
  ].filter(Boolean).join('; ');

  document.cookie = cookieString;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  
  return null;
};

export const removeCookie = (name: string): void => {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=strict`;
};

export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null;
};
