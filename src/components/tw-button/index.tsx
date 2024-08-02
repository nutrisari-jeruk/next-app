import { Button as HeadlessUIButton } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';

interface TwButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  size?: string;
  variant?: string;
  className?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: string;
}

export default function TwButton(props: TwButton) {
  const {
    title = 'Button',
    size = 'md',
    variant = 'primary',
    iconPosition = 'left',
    className = '',
    icon = null,
    ...attr
  } = props;

  const variantClass: { [key: string]: string } = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600',
    secondary:
      'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
    danger:
      'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600',
    success:
      'bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600',
  };

  const sizeClass: { [key: string]: string } = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2 py-1 text-sm',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-sm',
    xl: 'px-3.5 py-2.5 text-sm',
  };

  return (
    <div>
      <HeadlessUIButton
        className={clsx(
          'inline-flex items-center gap-x-1.5 rounded-md font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          sizeClass[size],
          variantClass[variant],
          className,
        )}
        {...attr}
      >
        {iconPosition === 'left' && icon}
        {title}
        {iconPosition === 'right' && icon}
      </HeadlessUIButton>
    </div>
  );
}
