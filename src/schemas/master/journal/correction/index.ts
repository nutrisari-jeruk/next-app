import { z } from 'zod';

export const CorrectionSchema = z.object({
  journal_kind: z
    .string({
      required_error: 'Jenis Koreksi is required',
      invalid_type_error: 'Jenis Koreksi must be a string',
    })
    .min(1, 'Jenis Umum is required'),
  accounts: z
    .array(
      z.object({
        is_credit: z.boolean({
          required_error: 'Is Credit is required',
          invalid_type_error: 'Is Credit must be a boolean',
        }),
        sap13_id: z.object({
          id: z
            .number({
              required_error: 'Kode Rekening is required',
              invalid_type_error: 'Kode Rekening must be a string',
            })
            .min(1, 'Kode Rekening is required'),
        }),
      }),
    )
    .refine(
      (accounts) =>
        accounts.some((account) => account.is_credit === true) &&
        accounts.some((account) => account.is_credit === false),
      {
        message:
          'Accounts must have at least one entry with credit and one with debit',
      },
    ),
});
