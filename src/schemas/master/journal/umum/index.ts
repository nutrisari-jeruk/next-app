import { z } from 'zod';

export const UmumSchema = z.object({
  jenis_jurnal: z
    .string({
      required_error: 'Jenis Umum is required',
      invalid_type_error: 'Jenis Umum must be a string',
    })
    .min(1, 'Jenis Umum is required'),
  kode_rekening_id: z.array(
    z.object({
      debit: z.object({
        id: z
          .number({
            required_error: 'Kode Rekening Debit is required',
            invalid_type_error: 'Kode Rekening Debit must be a number',
          })
          .min(1, 'Kode Rekening Debit is required'),
      }),
      credit: z.object({
        id: z
          .number({
            required_error: 'Kode Rekening Kredit is required',
            invalid_type_error: 'Kode Rekening Kredit must be a string',
          })
          .min(1, 'Kode Rekening Kredit is required'),
      }),
    }),
  ),
});
