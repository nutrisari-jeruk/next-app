import { z } from 'zod';

export const KoreksiSchema = z.object({
  jenis_jurnal: z
    .string({
      required_error: 'Jenis Koreksi is required',
      invalid_type_error: 'Jenis Koreksi must be a string',
    })
    .min(1, 'Jenis Koreksi is required'),
  debit: z.string({
    required_error: 'Debit is required',
    invalid_type_error: 'Debit is required',
  }),
  credit: z.string({
    required_error: 'Kredit is required',
    invalid_type_error: 'Kredit is required',
  }),
});
