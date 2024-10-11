import { z } from 'zod';

export const GeneralSchema = z.object({
  journal_kind: z
    .string({
      required_error: 'Jenis Umum is required',
      invalid_type_error: 'Jenis Umum must be a string',
    })
    .min(1, 'Jenis Umum is required'),
  accounts: z.array(
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
  ),
});
