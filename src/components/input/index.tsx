interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string | undefined;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  isError?: boolean;
  errorMessage?: string | string[];
  value?: string;
  className?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
}

export default function Input(props: Input) {
  const randomId = Math.random().toString(36).slice(2);

  const {
    id = randomId,
    name = undefined,
    placeholder = 'Enter here',
    type = 'text',
    isError = false,
    errorMessage = 'Error message',
    value = '',
    className = '',
    required = false,
    leftIcon = null,
    ...attr
  } = props;

  const textError = 'text-red-500';
  const borderError = 'border-red-500';

  return (
    <div className="relative space-y-1">
      {!!name && (
        <label
          htmlFor={name}
          className={`text-sm font-medium capitalize ${isError && textError}`}
        >
          <div className="flex items-center gap-1">
            {required && <span className="text-red-500">*</span>}
            {name}
          </div>
        </label>
      )}

      <div className="flex items-center justify-start">
        {!!leftIcon && (
          <div className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500">
            {leftIcon}
          </div>
        )}

        <input
          id={id}
          name={name}
          className={`${className} ${!!leftIcon && 'pl-10'} w-full rounded-md border border-slate-300 p-3 text-sm shadow-sm ${isError && textError} ${isError && borderError} placeholder:${isError && textError}`}
          type={type}
          defaultValue={value}
          placeholder={placeholder}
          required
          {...attr}
        />
      </div>

      {isError && (
        <span className="block text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
}
