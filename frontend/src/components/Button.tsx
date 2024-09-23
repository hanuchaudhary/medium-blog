import { motion } from "framer-motion";
interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <motion.button
      whileTap={{scale : 0.95}}
      whileHover={{scale : 1.05}}
      onClick={onClick}
      className="w-full bg-green-500 text-green-950 font-semibold py-2  hover:bg-green-400 focus:scale-110 border-2 border-green-700 focus:outline-none focus:ring-2 px-4 focus:ring-green-900 focus:ring-opacity-50"
    >
      {text}
    </motion.button>
  );
};

export default Button;
