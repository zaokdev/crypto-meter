import React from "react";

type Props = {
  children: React.ReactNode;
};

const H3 = ({ children }: Props) => {
  return <h3 className="text-xl">{children}</h3>;
};

export default H3;
