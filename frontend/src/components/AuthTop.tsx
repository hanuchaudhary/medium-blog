interface AuthTop {
  title: String;
  subTitle: String;
}

const AuthTop = ({ title, subTitle }: AuthTop) => {
  return (
    <div className="relative">
      <h1 className="text-3xl text-green-950 font-bold mb-4 text-center">{title}</h1>
      <p className="text-center text-sm mb-8">{subTitle}</p>
    </div>
  );
};

export default AuthTop;
