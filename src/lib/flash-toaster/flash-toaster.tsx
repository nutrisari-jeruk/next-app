import FlashToasterClient from '@/lib/flash-toaster/flash-toaster-client';
import { cookies } from 'next/headers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function FlashToaster() {
  const flash = cookies().get('flash');
  return (
    <>
      <FlashToasterClient flash={flash?.value} />
      <ToastContainer />
    </>
  );
}

export function setFlash(flash: {
  type: 'success' | 'error';
  message: string;
  tag: string | number;
}) {
  cookies().set('flash', JSON.stringify(flash), {
    expires: new Date(Date.now() + 1000),
  });
}
