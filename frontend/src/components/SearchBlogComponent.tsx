import { Link } from "react-router-dom";

interface searchDataInterface {
  title: string | undefined;
  to: string;
  name: string | undefined;
}
const SearchBlogComponent = ({ title, name, to }: searchDataInterface) => {
  return (
    <Link to={to} className="flex items-center dark:bg-neutral-800 rounded-lg justify-between px-5 py-3 hover:bg-green-50 dark:hover:bg-neutral-900 transition-colors my-1">
      <h1 className="text-xs md:text-lg dark:text-neutral-100  text-green-950 font-semibold">{title}</h1>
      <div className="">
        <div className="flex items-center text-start gap-2">
          <h1 className="text-left text-sm hidden dark:text-white sm:block md:text-md">Author: </h1>
          <h1 className="text-left font-semibold hidden sm:block capitalize text-green-800 dark:text-green-600">
            {name}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default SearchBlogComponent;
