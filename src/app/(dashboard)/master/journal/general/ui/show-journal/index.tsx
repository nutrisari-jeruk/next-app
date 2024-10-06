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
                <div className="flex items-start">
                  <div className="mt-3 w-full space-y-4">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="w-1/8 font-bold leading-5">Kode</td>
                          <td className="w-1/12">:</td>
                          <td className="w-full">{data?.data.jurnal_kode}</td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-bold leading-5">Jenis</td>
                          <td>:</td>
                          <td className="w-full">{data?.data.jurnal_jenis}</td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="w-full table-fixed divide-y divide-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="w-1/2">Kode Rekening Debit</th>
                          <th className="w-1/2">Kode Rekening Kredit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {data?.data.kode_rekening?.map((item, index) => (
                          <tr key={index}>
                            <td className="w-1/2">{item.debit}</td>
                            <td className="w-1/2">{item.credit}</td>
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
