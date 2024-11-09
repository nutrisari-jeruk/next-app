import { TwHeader } from '@/components';
import CreateForm from '../ui/create-form';

export default async function Page() {
  return (
    <>
      <TwHeader title="Tambah Pencatatan Jurnal Penyesuaian" />
      <CreateForm />
    </>
  );
}
