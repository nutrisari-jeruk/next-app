interface Button {
  title?: string;
  size?: string;
  variant?: string;
  type?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  attrs?: React.HTMLAttributes<HTMLButtonElement>;
  handleClick?: () => void;
}

export default function Button(props: Button) {
  const {
    title = 'Button',
    size = 'md',
    variant = 'primary',
    type = 'button',
    className = '',
    icon = null,
    handleClick,
  } = props;

  const variantClass: { [key: string]: string } = {
    primary:
      'bg-gray-800 hover:bg-gray-700 active:bg-gray-700 disabled:bg-gray-700',
    secondary: 'bg-red-500',
  };

  const sizeClass: { [key: string]: string } = {
    sm: 'text-sm p-2',
    md: 'text-md px-4 py-2',
    lg: 'text-lg px-8 py-4',
  };

  return (
    <button
      type={type}
      className={`${className} w-full rounded text-white ${variantClass[variant]} ${sizeClass[size]}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center gap-2">
        {icon}
        {title}
      </div>
    </button>
  );
}
