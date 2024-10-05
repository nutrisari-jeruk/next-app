import { object, string } from 'zod';

export const signInSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const ssoSignInSchema = object({
  token: string({ required_error: 'SSO Token is required' }).min(
    33,
    'SSO Token is required',
  ),
});

export const selectRoleSchema = object({
  user_id: string({ required_error: 'User id is required' }),
  role_id: string({ required_error: 'Role id is required' }),
});
