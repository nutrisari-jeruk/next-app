import { z } from 'zod';

export const PenutupSchema = z.object({
  journal_kind: z
    .string({
      required_error: 'Jenis Penutup is required',
      invalid_type_error: 'Jenis Penutup must be a string',
    })
    .min(1, 'Jenis Penutup is required'),
    accounts_id: z.array(
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
