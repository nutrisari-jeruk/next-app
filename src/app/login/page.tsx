'use client';

import { TwButton, Input } from '@/components';
import { useFormState, useFormStatus } from 'react-dom';
import {
  ArrowRightEndOnRectangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { getUserRole } from '@/actions/auth/getUserRole';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useLoggedInUser } from '@/store/user';
import { useRouter } from 'next/navigation';
import Loading from './loading';
import ReCAPTCHA from 'react-google-recaptcha';
import { set } from 'zod';

const SubmitButton = (props: {
  captchaToken: string | null;
  isLoading: boolean;
}) => {
  const { captchaToken, isLoading } = props;
  return (
    <TwButton
      type="submit"
      title="Login"
      className="w-full"
      size="lg"
      aria-disabled={isLoading}
      disabled={isLoading || !captchaToken}
      isLoading={isLoading}
      icon={<ArrowRightEndOnRectangleIcon className="w-5" />}
    />
  );
};

export default function Page({ searchParams }: any) {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const ssoToken = searchParams?.ssoToken || '';
  const router = useRouter();
  const [state, formAction] = useFormState(getUserRole, undefined);
  const { setLoggedInUser } = useLoggedInUser();
  const [isLoading, setIsLoading] = useState(true);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (state?.user) {
      setLoggedInUser?.(state.user);
      router.push(`/role-select`);
    }
    setPending(false);
  }, [state, setLoggedInUser, router, ssoToken]);

  useEffect(() => {
    if (ssoToken) {
      const formData = new FormData();
      formData.append('ssoToken', ssoToken);
      formAction(formData);
    } else {
      setIsLoading(false);
    }
  }, [ssoToken, formAction]);

  const handleInputChange = () => {
    // Reset reCAPTCHA saat input berubah
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setCaptchaToken(null);
    }
  };

  // Fungsi untuk menangani perubahan CAPTCHA
  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    if (!captchaToken) {
      setPending(false);
      return;
    }

    // Submit form dengan captchaToken
    const formData = new FormData(event.currentTarget);
    formData.append('captchaToken', captchaToken);
    formAction(formData);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-4 rounded-xl bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="w-70 space-y-2">
              <Input name="email" onChange={handleInputChange} />
              <Input
                name="password"
                type="password"
                onChange={handleInputChange}
              />
              {/* Komponen reCAPTCHA */}

              <ReCAPTCHA
                type="image"
                size="normal"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                onChange={onCaptchaChange}
                ref={recaptchaRef}
              />

              <SubmitButton captchaToken={captchaToken} isLoading={pending} />
            </form>
            {state?.errorMessage && (
              <p className="flex items-center gap-1 text-sm text-red-500">
                <ExclamationCircleIcon className="w-5" />
                {state.errorMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
