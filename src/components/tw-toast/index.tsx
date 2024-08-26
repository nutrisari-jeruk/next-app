'use client';

import { toast, ToastContainer, Bounce } from 'react-toastify';
import { useEffect } from 'react';
import { env } from 'process';

interface TwToast {
  message: string;
  status: string | undefined;
  onClose?: () => void;
}

export default function TwToast(props: TwToast) {
  const { message, status = 'success', onClose = async () => {} } = props;
  const clearToast = async () => {
    await fetch(`/api/clear-toast`, {
      method: 'POST',
    });
  };

  useEffect(() => {
    if (message && status) {
      switch (status) {
        case 'success':
          toast.success(message);
          break;
        case 'error':
          toast.error(message);
          break;
      }
    }
    clearToast();

    onClose();
  }, [message, status, onClose]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
