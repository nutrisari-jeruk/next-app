import { Field, Input, Label } from '@headlessui/react';

interface TwInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export default function TwInput({
  name,
  label,
  className,
  ...rest
}: TwInputProps) {
  return (
    <Field className={'w-full flex flex-col text-base'}>
      {!!label && <Label>{label}</Label>}
      <Input className={className} {...rest} invalid />
    </Field>
  );
}
