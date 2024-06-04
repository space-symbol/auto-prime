const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="flex w-full h-full overflow-auto relative text-black">{children}</div>;
};

export default AuthLayout;
