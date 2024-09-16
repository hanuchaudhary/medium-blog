import { Link } from "react-router-dom";

interface searchDataInterface {
  title: string | undefined;
  to: string;
  name: string | undefined;
}
const SearchBlogComponent = ({ title, name, to }: searchDataInterface) => {
  return (
    <Link to={to} className="flex items-center justify-between px-5 py-2 border-b">
      <h1>{title}</h1>
      <div className="">
        <div className="flex items-center text-start gap-2">
          <h1 className="text-left">Author: </h1>
          <h1 className="text-left font-semibold text-xs capitalize text-green-800">
            {name}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default SearchBlogComponent;
