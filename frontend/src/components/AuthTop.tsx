interface AuthTop {
  title: String;
}

const AuthTop = ({ title }: AuthTop) => {
  return (
    <div className="relative">
      <h1 className="text-3xl font-bold md:mb-4 mb-2 text-black text-center uppercase">{title}</h1>
    </div>
  );
};

export default AuthTop;
