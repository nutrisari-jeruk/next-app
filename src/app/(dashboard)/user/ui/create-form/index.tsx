'use client';

import Link from 'next/link';
import { Input, TwButton } from '@/components';
import { useFormState, useFormStatus } from 'react-dom';
import { ArrowUturnLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import { createUser } from '../../actions';

export default function CreateUserForm() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(createUser, undefined);

  return (
    <form action={formAction} className="mt-4 rounded-lg bg-white p-4 shadow">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="flex flex-col space-y-4">
            <div className="flex w-full gap-x-6">
              <div className="w-full">
                <Input
                  name="name"
                  required
                  isError={!!state?.errors.name}
                  errorMessage={state?.errors.name}
                />
              </div>

              <div className="w-full">
                <Input
                  name="email"
                  type="email"
                  required
                  isError={!!state?.errors.email}
                  errorMessage={state?.errors.email}
                />
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="role"
                className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </label>
              <select id="role" name="role" className="w-full rounded text-sm">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {!!state?.errors.role && (
                <span className="text-sm text-red-500">
                  {state?.errors.role}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="active"
                className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
              >
                <input
                  type="radio"
                  className="rounded-full"
                  name="is_active"
                  id="active"
                  defaultChecked
                  defaultValue="true"
                />
                Active
              </label>

              <label
                htmlFor="non-active"
                className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
              >
                <input
                  type="radio"
                  className="rounded-full"
                  name="is_active"
                  id="non-active"
                  defaultValue="false"
                />
                Non-active
              </label>
              {!!state?.errors.is_active && (
                <span className="text-sm text-red-500">
                  {state?.errors.is_active}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link href="/user">
          <TwButton
            type="button"
            title="Cancel"
            variant="secondary"
            icon={<ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />}
          />
        </Link>

        <TwButton
          type="submit"
          disabled={pending}
          title="Save"
          variant="success"
          icon={<CheckIcon className="h-5 w-5" aria-hidden="true" />}
        />
      </div>
    </form>
  );
}
