interface Input {
  name?: string;
  placeholder?: string;
  type?: string;
  isError?: boolean;
  errorMessage?: string | string[];
  value?: string;
  className?: string;
  required?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: Input) {
  const randomId = Math.random().toString(36).slice(2);

  const {
    name = `input-${randomId}`,
    placeholder = 'Enter here',
    type = 'text',
    isError = false,
    errorMessage = 'Error message',
    value = '',
    className = '',
    required = false,
    handleChange = () => {},
  } = props;

  const textError = 'text-red-500';
  const borderError = 'border-red-500';

  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className={`text-sm font-medium capitalize ${isError && textError}`}
      >
        <div className="flex items-center gap-1">
          {required && <span className="text-red-500">*</span>}
          {name}
        </div>
      </label>
      <input
        id={name}
        name={name}
        className={`${className} w-full rounded-md border p-3 text-sm shadow-sm ${isError && textError} ${isError && borderError} placeholder:${isError && textError}`}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        required
        onChange={handleChange}
      />
      {isError && (
        <span className="block text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
}
