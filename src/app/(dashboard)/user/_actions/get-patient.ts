import $http from '@/lib/axios';
import axios, { AxiosError } from 'axios';

export default async function getPatient() {
  const params = {
    nik: '3514121904900002',
  };

  try {
    const response = await $http.get('https://api.rsudsidoarjo.co.id/rest_pegawai/sdm/yasin');
    const patient = response.data.mysql_sdm;
    console.log(patient)
    return patient;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
  }
}
