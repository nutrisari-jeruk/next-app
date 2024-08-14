import { z } from 'zod';

export const PenyesuaianSchema = z.object({
  jenis_jurnal: z
    .string({
      required_error: 'Jenis Penyesuaian is required',
      invalid_type_error: 'Jenis Penyesuaian must be a string',
    })
    .min(1, 'Jenis Penyesuaian is required'),
  kode_rekening_id: z.object({
    debit: z.number({
      required_error: 'Debit is required',
    }),
    credit: z.number({
      required_error: 'Kredit is required',
    }),
  }),
});
