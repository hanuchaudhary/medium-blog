interface AvatarProps {
    data?: {
      name?: string;
    };
  }
  
  const Avatar = ({ data }: AvatarProps) => {
    const logoName = data?.name?.split(" ") || [];
  
    return (
      <div className="w-10 h-10 select-none cursor-pointer flex items-center justify-center bg-green-500 font-semibold hover:bg-green-600 hover:scale-105 transition-transform text-white rounded-full">
        {logoName.length > 1
          ? `${logoName[0][0]}${logoName[1][0]}`
          : logoName[0]
          ? logoName[0][0] 
          : ""}
      </div>
    );
  };
  
  export default Avatar;
  