import { Navigate, Outlet } from "react-router-dom";
import { useAppSeletor } from "../services/helper/redux";

interface PropsInterface{
  allowedRole: string[]

}

const ProtectedRoutes = ({allowedRole}: PropsInterface) => {
  const { token, user} = useAppSeletor((state) => state.auth);
  console.log("user", user)

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRole.includes(user.role!)) { //non null assertion- role never null
    return <Navigate to="/" replace />;
  }else{
    if(allowedRole.includes("admin")){
       <Navigate to={"/admin/dashboard"} replace />

    }else{
      <Navigate to={"/instructor/dashboard"} replace />
    }
  }

  return <Outlet />;
};

export default ProtectedRoutes