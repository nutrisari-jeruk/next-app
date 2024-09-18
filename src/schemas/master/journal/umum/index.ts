import { z } from 'zod';

export const UmumSchema = z.object({
  jenis_jurnal: z
    .string({
      required_error: 'Jenis Umum is required',
      invalid_type_error: 'Jenis Umum must be a string',
    })
    .min(1, 'Jenis Umum is required'),
    debit: z.string({
      required_error: 'Debit is required',
      invalid_type_error: 'Debit is required',
    }),
    credit: z.string({
      required_error: 'Kredit is required',
      invalid_type_error: 'Kredit is required',
    }),
});
