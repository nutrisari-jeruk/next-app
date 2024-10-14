import { z } from 'zod';

export const MapSchema = z.object({
  sap13_id_expend: z.number({
    required_error: 'Kode Rekening Belanja 050 wajib diisi',
    invalid_type_error: 'Kode Rekening Belanja 050 wajib diisi',
  }),
  sap13_id_burden_asset: z.number({
    required_error: 'Kode Rekening SAP 13 wajib diisi',
    invalid_type_error: 'Kode Rekening SAP 13 wajib diisi',
  }),
});
