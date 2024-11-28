/*
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [];

/*
 * An array of routes that used for authentication
 * These routes will redirect logged in users to callBackUrl
 * @type {string[]}
 */
export const authRoutes = ['/login', '/role-select'];

/*
 * An api routes that used for authentication putposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

export const adminRoutes = ['/master', '/mapping', '/transaction', '/report'];

export const DEFAULT_LOGIN_REDIRECT = '/';
