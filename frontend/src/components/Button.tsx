interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-green-600 text-green-950 font-semibold py-2  hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-opacity-50"
    >
      {text}
    </button>
  );
};

export default Button;
