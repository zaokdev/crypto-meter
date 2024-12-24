import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const H3 = ({ children, className }: Props) => {
  return <h3 className={`text-xl ${className}`}>{children}</h3>;
};

export default H3;
