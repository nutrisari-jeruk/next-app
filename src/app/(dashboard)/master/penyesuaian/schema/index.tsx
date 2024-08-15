import { z } from 'zod';

export const PenyesuaianSchema = z.object({
  jenis_jurnal: z
    .string({
      required_error: 'Jenis Penyesuaian is required',
      invalid_type_error: 'Jenis Penyesuaian must be a string',
    })
    .min(1, 'Jenis Penyesuaian is required'),
  debit: z.string({
    required_error: 'Debit is required',
    invalid_type_error: 'Debit is required',
  }),
  credit: z.string({
    required_error: 'Kredit is required',
    invalid_type_error: 'Kredit is required',
  }),
});
