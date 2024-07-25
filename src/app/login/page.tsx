'use client';

import { useState } from 'react';
import { Button, Input } from '@/components';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleSubmit() {
    router.push('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl bg-white p-8 shadow-lg">
        <form className="w-80 space-y-2">
          <Input
            name="username"
            value={username}
            handleChange={handleUsernameChange}
          />
          <Input
            name="password"
            type="password"
            value={password}
            handleChange={handlePasswordChange}
          />
          <Button title="Login" handleClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
}
