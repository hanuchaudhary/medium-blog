
interface fullBlogProps {
    id?: string
    title: string;
    content: string;
    name: string;
    published?: string;
    author? : {
      name : string
    }
  }

const FullBlog = ({title,content,name}:fullBlogProps) => {
  return (
    <div>
      <div className="w-full">
        <div className="flex items-center gap-2 font-mono">
          <div className="avatar h-14 w-14 bg-zinc-600 flex items-center justify-center rounded-full">
            <h1 className="font-semibold text-2xl capitalize text-white">{name[0]}</h1>
          </div>
          <div className="">
            <h1 className="font-semibold capitalize">{name}</h1>
            <div className="flex gap-2">
              <h1>{Math.ceil(content.length/100) + " Minutes Read"}</h1>
              <p className="published"></p>
            </div>
          </div>
        </div>
        <div className="content font-mono">
          <h1 className="font-semibold md:text-5xl text-3xl my-7 capitalize">{title}</h1>
          <p className="md:text-xl text-lg capitalize">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
