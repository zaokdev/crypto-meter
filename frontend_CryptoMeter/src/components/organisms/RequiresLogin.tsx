import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const RequiresLogin = ({ children }: Props) => {
  const jwtToken = localStorage.getItem("CryptoMeter_JWT_Token");

  if (!jwtToken) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
};

export default RequiresLogin;
