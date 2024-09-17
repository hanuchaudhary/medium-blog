interface AuthTop {
  title: String;
  subTitle: String;
}

const AuthTop = ({ title, subTitle }: AuthTop) => {
  return (
    <div className="relative">
      <h1 className="text-3xl text-green-950 dark:bg-neutral-900 dark:text-green-500 font-bold md:mb-4 mb-2 text-center">{title}</h1>
      <p className="text-center text-sm md:mb-8 mb-4">{subTitle}</p>
    </div>
  );
};

export default AuthTop;
