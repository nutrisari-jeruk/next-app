import CreateUserForm from '../ui/create-form';

export default function Page() {
  return (
    <>
      <h1 className="text-xl font-semibold leading-7 text-gray-900">
        User Information
      </h1>

      <CreateUserForm />
    </>
  );
}
