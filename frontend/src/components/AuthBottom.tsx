import { Link } from "react-router-dom";

interface labelAuth {
  label: string;
  to: string;
  title: string;
}

const AuthBottom = ({ label, title, to }: labelAuth) => {
  return (
    <div className="md:my-5 my-3">
      <h1 className="text-center">
        {title}{" "}
        <Link className="hover:underline dark:text-green-500 text-green-800 font-semibold" to={to}>
          {label}
        </Link>
      </h1>
    </div>
  );
};

export default AuthBottom;
