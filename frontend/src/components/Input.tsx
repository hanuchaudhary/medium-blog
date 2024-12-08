import { ChangeEvent } from "react";
import BackgroundPanel from "./BackgroundPanel";
import { motion } from "framer-motion";

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  name,
}: InputProps) => {
  return (
    <div className="mb-4 md:mb-6">
      <label className="block font-medium text-black text-base mb-1 md:mb-2">
        {label}
      </label>
      <div
        className="relative"
      >
        <motion.input
          whileFocus={{
            translateY: 2,
            translateX: 2,
          }}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full relative z-[9999] text-black h-full px-4 py-2 border-2 border-black rounded-md focus-visible:outline-none"
        />
        <BackgroundPanel />
      </div>
    </div>
  );
};

export default Input;
