import { Link } from "react-router-dom";

interface searchDataInterface {
  title: string | undefined;
  to: string;
  name: string | undefined;
}
const SearchBlogComponent = ({ title, name, to }: searchDataInterface) => {
  return (
    <Link to={to} className="flex items-center justify-between px-5 py-3 hover:bg-green-50 transition-colors border-b">
      <h1 className="text-xs md:text-lg text-green-950 font-semibold">{title}</h1>
      <div className="">
        <div className="flex items-center text-start gap-2">
          <h1 className="text-left text-sm hidden sm:block md:text-md">Author: </h1>
          <h1 className="text-left font-semibold hidden sm:block capitalize text-green-800">
            {name}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default SearchBlogComponent;
