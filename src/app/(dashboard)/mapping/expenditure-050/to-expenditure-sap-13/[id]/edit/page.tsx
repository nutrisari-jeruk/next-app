import Form from '@/app/(dashboard)/mapping/expenditure-050/to-expenditure-sap-13/ui/form/edit';
import { TwHeader } from '@/components';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <TwHeader title="Buat Mapping" />
      <Form {...{ params }} />
    </>
  );
}
