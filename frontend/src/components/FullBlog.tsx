
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
      <div>
        <div className="flex items-center gap-2 font-mono">
          <div className="avatar h-14 w-14 bg-zinc-600 flex items-center justify-center rounded-full">
            <h1 className="font-semibold text-2xl capitalize text-white">{name[0]}</h1>
          </div>
          <div className="">
            <h1 className="font-semibold capitalize">{name}</h1>
            <div className="flex gap-2">
              <h1>{Math.ceil(content.length/60) + " Minutes Read"}</h1>
              <p className="published"></p>
            </div>
          </div>
        </div>
        <div className="content font-mono">
          <h1 className="font-semibold text-5xl my-7 capitalize">{title}</h1>
          <p className="text-xl capitalize">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
