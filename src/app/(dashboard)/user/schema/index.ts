import { z } from 'zod';

export const UserSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(1, 'Name is required')
    .max(32, 'Name must be less than 32 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email'),
  role: z.enum(['user', 'admin']),
  is_active: z.boolean({
    required_error: 'Is active is required',
    invalid_type_error: 'isActive must be a boolean',
  }),
});
