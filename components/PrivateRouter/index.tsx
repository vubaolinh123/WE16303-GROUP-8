import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import LoadingPage from "../Display/LoadingPage";

type PrivateRouteProps = {
  children: any;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const currentUser = useSelector((state: any) => state.auth.value.user);
  const router = useRouter();

  if (!isLoggedIn) {
    router.push('/login');
    return <LoadingPage/>
  } else if (currentUser.role !== 1) {
    router.push('/');
    return <LoadingPage/>
  }
  return children;
};

export default PrivateRoute;