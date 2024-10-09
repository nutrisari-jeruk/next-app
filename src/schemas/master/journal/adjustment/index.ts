import { z } from 'zod';

export const PenyesuaianSchemaSchema = z.object({
  jenis_jurnal: z
    .string({
      required_error: 'Jenis Penyesuaian is required',
      invalid_type_error: 'Jenis Penyesuaian must be a string',
    })
    .min(1, 'Jenis Penyesuaian is required'),
  kode_rekening_id: z.array(
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
