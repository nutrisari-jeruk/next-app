import { z } from 'zod';

export const UmumSchema = z.object({
  jenis_jurnal: z
    .string({
      required_error: 'Jenis Umum is required',
      invalid_type_error: 'Jenis Umum must be a string',
    })
    .min(1, 'Jenis Umum is required'),
  kode_rekening_id: z.object({
    debit: z.number({
      required_error: 'Debit is required',
    }),
    kredit: z.number({
      required_error: 'Kredit is required',
    }),
  }),
});
