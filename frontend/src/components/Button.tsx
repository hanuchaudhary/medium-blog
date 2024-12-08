import { motion } from "framer-motion";
import BackgroundPanel from "./BackgroundPanel";
interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button = ({ text, onClick, type }: ButtonProps) => {
  return (
    <div className="relative">
      <motion.button
        type={type}
        whileTap={{ translateX: 4, translateY: 4 }}
        onClick={onClick}
        className="w-full relative z-[99999] rounded-lg bg-customPink border-2 border-black text-black font-semibold py-2"
      >
        {text}
      </motion.button>
      <BackgroundPanel />
    </div>
  );
};

export default Button;
