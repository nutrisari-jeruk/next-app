import { z } from 'zod';

export const PenutupSchema = z.object({
  jenis_jurnal: z
    .string({
      required_error: 'Jenis Penutup is required',
      invalid_type_error: 'Jenis Penutup must be a string',
    })
    .min(1, 'Jenis Penutup is required'),
    debit: z.string({
      required_error: 'Debit is required',
      invalid_type_error: 'Debit is required',
    }),
    credit: z.string({
      required_error: 'Kredit is required',
      invalid_type_error: 'Kredit is required',
    }),
});
