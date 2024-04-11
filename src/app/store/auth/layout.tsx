const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="flex m-auto overflow-auto relative">{children}</div>;
};

export default AuthLayout;
