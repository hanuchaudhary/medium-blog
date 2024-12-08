import { Link } from "react-router-dom";

interface labelAuth {
  label: string;
  to: string;
  title: string;
}

const AuthBottom = ({ label, title, to }: labelAuth) => {
  return (
    <div className="md:my-5 my-3">
      <h1 className="text-center text-black">
        {title}{" "}
        <Link className="underline font-bold text-black" to={to}>
          {label}
        </Link>
      </h1>
    </div>
  );
};

export default AuthBottom;
