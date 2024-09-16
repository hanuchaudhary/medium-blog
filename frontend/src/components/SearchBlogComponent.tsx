import { Link } from "react-router-dom";

interface searchDataInterface{
    title : string | undefined;
    to: string;
    name : string | undefined
}
const SearchBlogComponent = ({title, name , to} : searchDataInterface) => {
  return (
    <Link to={to} className="flex items-center justify-between px-5 py-2">
      <h1>{title}</h1>
      <div className="flex justify-center items-center gap-2">
        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-green-500 text-white">
          <h1 className="font-semibold">A</h1>
        </div>
        <div className="name text-xl font-semibold">{name}</div>
      </div>
    </Link>
  );
};

export default SearchBlogComponent;
