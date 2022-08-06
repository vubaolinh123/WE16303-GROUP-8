import { useRouter } from "next/router";
import { useSelector } from "react-redux";

type PrivateRouteProps = {
  children: any;
  roleAccept?: number;
};

const PrivateRoute = ({ children, roleAccept = 1 }: PrivateRouteProps) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  const currentUser = useSelector((state: any) => state.auth.value.user);
  const router = useRouter();

  if (!isLoggedIn) {
    router.push("/login");
    return;
  } else if (currentUser.role !== 1 && currentUser.role !== roleAccept) {
    router.push("/");
    return;
  }
  return children;
};

export default PrivateRoute;
