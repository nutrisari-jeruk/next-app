'use client';

import { Input, TwButton } from '@/components';
import { createUser } from '../actions';
import { useFormState, useFormStatus } from 'react-dom';
import { ArrowUturnLeftIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function Page() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(createUser, undefined);

  return (
    <div>
      {!!state && <p>{JSON.stringify(state?.errors)}</p>}
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
          <TwButton
            type="button"
            title="Cancel"
            variant="secondary"
            icon={<ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />}
          />

          <TwButton
            type="submit"
            disabled={pending}
            title="Save"
            variant="success"
            icon={<CheckIcon className="h-5 w-5" aria-hidden="true" />}
          />
        </div>
      </form>
    </div>
  );
}
