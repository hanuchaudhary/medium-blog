import { ChangeEvent } from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input = ({ label, type, value, onChange, placeholder , name }: InputProps) => {
  return (
    <div className="mb-4 md:mb-6">
      <label className="block text-sm  font-medium dark:text-green-500 text-green-900 mb-1 md:mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 text-green-900 border dark:bg-neutral-100 border-gray-400 rounded-none focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"
      />
    </div>
  );
};

export default Input;
