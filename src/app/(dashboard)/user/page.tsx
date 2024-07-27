'use client';

import useUser from '@/hooks/useUser';

export default function Page() {
  const { user, isLoading, error } = useUser();

  return (
    <>
      <h1>User Page</h1>
      {error && <p>{error.message}</p>}
      {isLoading && <p>Loading...</p>}
      {user && !isLoading && <p>{JSON.stringify(user)}</p>}
    </>
  );
}
