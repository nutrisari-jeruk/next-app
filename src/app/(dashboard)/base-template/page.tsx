import { TwButton, TwHeader } from '@/components';
import {
  ArrowUturnLeftIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

export default async function Page() {
  return (
    <>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          <TwHeader
            button={[
              <TwButton
                key="add"
                type="button"
                title="Add"
                icon={<PlusCircleIcon className="h-5 w-5" aria-hidden="true" />}
              />,
              <TwButton
                key="back"
                type="button"
                title="Back"
                variant="secondary"
                className="ml-2"
                icon={
                  <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
                }
              />,
            ]}
          />
        </div>
        <div className="px-4 py-5 sm:p-6">
          <h2 className="mb-2 text-lg">Button Size</h2>
          <div className="mx-auto grid w-full grid-cols-5">
            <TwButton title="Button xs" size="xs" />
            <TwButton title="Button sm" size="sm" />
            <TwButton title="Button md" size="md" />
            <TwButton title="Button lg" size="lg" />
            <TwButton title="Button xl" size="xl" />
          </div>

          <h2 className="mb-2 mt-4 text-lg">Button Variant</h2>
          <div className="mx-auto grid w-full grid-cols-5">
            <TwButton title="Primary" variant="primary" />
            <TwButton title="Secondary" variant="secondary" />
            <TwButton title="Success" variant="success" />
            <TwButton title="Danger" variant="danger" />
            <TwButton title="Info" variant="info" />
          </div>

          <h2 className="mb-2 mt-4 text-lg">Button with icon</h2>
          <div className="mx-auto grid w-full grid-cols-5">
            <TwButton
              variant="primary"
              title="left icon"
              icon={<PlusCircleIcon className="h-5 w-5" aria-hidden="true" />}
            />
            <TwButton
              title="right icon"
              variant="primary"
              icon={<PlusCircleIcon className="h-5 w-5" aria-hidden="true" />}
              iconPosition="right"
            />
          </div>
        </div>
      </div>
    </>
  );
}
