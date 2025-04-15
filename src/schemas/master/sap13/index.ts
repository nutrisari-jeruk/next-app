import { z } from 'zod';

export const GeneralSchema = z.object({
  account_description: z
    .string({
      required_error: 'Account Description is required',
      invalid_type_error: 'Account Description must be a string',
    })
    .min(1, 'Account Description is required'),
  parent_id: z
    .number({
      required_error: 'Parent ID is required',
      invalid_type_error: 'Parent ID must be a number',
    })
    .min(0, 'Parent ID is required'),
});