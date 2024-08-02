'use client';

import { useSession } from "next-auth/react";

export default function Page() {
  const { data } = useSession();
  const name = data?.user.name;
  return (
    <>
      <h1>Welcome, {name}</h1>
    </>
  );
}
