import { fetchUserById } from '../../actions';
import { notFound } from 'next/navigation';
import EditUserForm from '../../ui/edit-form';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const user = await fetchUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <>
      <h1 className="text-xl font-semibold leading-7 text-gray-900">
        User Information
      </h1>
      <EditUserForm user={user} />
    </>
  );
}
