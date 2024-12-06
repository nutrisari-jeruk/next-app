'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Page() {
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const name = data?.user.name;
  return (
    <>
      <h1>Welcome, {name}</h1>
    </>
  );
}
