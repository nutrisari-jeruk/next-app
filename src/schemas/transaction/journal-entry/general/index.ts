import { Description } from '@headlessui/react';
import { z } from 'zod';

export const GeneralEntrySchema = z.object({
  journal_id: z
    .number({
      required_error: 'Journal is required',
      invalid_type_error: 'Journal must be a number',
    })
    .min(1, 'Journal is required'),
  transaction_date: z.string({
    required_error: 'Transaction Date is required',
    invalid_type_error: 'Transaction Date must be a string',
  }),
  descriptions: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(1, 'Description is required'),
  accounts: z.array(
    z.object({
      id: z
        .number({
          required_error: 'Accounts is required',
          invalid_type_error: 'Accounts must be a string',
        })
        .min(1, 'Accounts is required'),
      amount: z
        .number({
          required_error: 'amount is required',
          invalid_type_error: 'amount must be a string',
        })
        .min(1, 'amount is required'),
    }),
  ),
});
