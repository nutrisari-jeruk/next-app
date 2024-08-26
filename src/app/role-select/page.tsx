'use client';

import { TwButton, TwSelect } from '@/components';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/login/actions/authenticate';
import {
  ArrowRightEndOnRectangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Option } from '@/types/option';

export default function RoleSelect() {
  const { pending } = useFormStatus();
  const [errorMessage, formAction] = useFormState(authenticate, undefined);

  const options = [
    { label: 'User', value: '2' },
    { label: 'Admin', value: '1' },
  ];

  const [selectedRole, setSelectedRole] = useState<Option | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedRole) {
      const formData = new FormData();
      formData.append('user_id', '6');
      formData.append('role_id', String(selectedRole.value));

      return formAction(formData);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl bg-white p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="w-80 space-y-2">
          <TwSelect
            label="Select Your Role"
            options={options}
            selectedData={selectedRole}
            setSelectedData={setSelectedRole}
            placeHolder="Select a role"
          />
          <TwButton
            type="submit"
            title="Login"
            className="w-full"
            size="lg"
            aria-disabled={pending}
            disabled={pending}
            isLoading={false}
            icon={<ArrowRightEndOnRectangleIcon className="w-5" />}
          />
        </form>
        {errorMessage && (
          <p className="flex items-center gap-1 text-sm text-red-500">
            <ExclamationCircleIcon className="w-5" />
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
