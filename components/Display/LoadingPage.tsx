import type { NextPage } from "next";
import LayoutNone from "../Layout/none";

const LoadingPage: NextPage = () => {
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <img src="/loading2.gif"/>
            </div>
        </>
    );
}

LoadingPage.Layout = LayoutNone

export default LoadingPage;
