import React from "react";
type Props = {
  children?: React.ReactNode;
  className?: string;
};
const UICard = ({ children, className }: Props) => {
  return (
    <div
      className={`bg-slate-900 h-fit flex flex-col items-center justify-center py-12 ${className}`}
    >
      {children}
    </div>
  );
};
export default UICard;
