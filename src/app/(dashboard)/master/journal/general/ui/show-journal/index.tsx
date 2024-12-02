import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { TwButton } from '@/components';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  data: any;
};
export default function Show({
  isOpen = false,
  handleClose = () => {},
  data,
}: Props) {
  return (
    <Transition show={isOpen}>
      <Dialog className="relative z-10" onClose={handleClose}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative w-full max-w-2xl transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all">
                <div>
                  <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                      Informasi Jurnal
                    </h3>
                  </div>
                  <div className="mt-6 border-t border-gray-100 px-3 shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold leading-6 text-gray-900">
                          Kode Jurnal
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {data.data.journal_code}
                        </dd>
                      </div>

                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-bold leading-6 text-gray-900">
                          Jenis Jurnal
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {data.data.journal_kind}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="w-full table-fixed divide-y divide-gray-300">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="w-1/3 px-3 py-2 text-left text-sm font-semibold text-gray-900">
                            Kode Rekening
                          </th>
                          <th className="w-1/3 px-3 py-2 text-left text-sm font-semibold text-gray-900">
                            Debit
                          </th>
                          <th className="w-1/3 px-3 py-2 text-left text-sm font-semibold text-gray-900">
                            Kredit
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {data.data.accounts.map((item: any) => (
                          <tr key={item.id}>
                            <td className="px-3 py-2 text-sm text-gray-500">
                              {item.code}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500">
                              {item.debit}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500">
                              {item.credit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <TwButton
                    variant="secondary"
                    className="ml-2"
                    onClick={handleClose}
                    isLoading={false}
                    icon={<XMarkIcon className="h-4 w-4" />}
                    iconPosition="left"
                    title="Tutup"
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
