import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import LoadingPage from "../Display/LoadingPage";

type PrivateRouteProps = {
    children: any;
  };
  
const PrivateClient = ({children}: PrivateRouteProps) => {
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const router = useRouter();
  
    if (isLoggedIn) {
      router.push('/account');
      return <LoadingPage/>;
    } 
    return children;
};

export default PrivateClient