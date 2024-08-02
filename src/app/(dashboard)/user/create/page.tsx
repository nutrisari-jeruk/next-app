'use client';

import { Input } from '@/components';
import { createUser } from '../actions';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';

export default function Page() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(createUser, undefined);

  return (
    <div>
      <form action={formAction}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 flex flex-col space-y-4">
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
                <select
                  id="role"
                  name="role"
                  className="w-full rounded text-sm"
                >
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
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
