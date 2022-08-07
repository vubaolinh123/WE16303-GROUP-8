import type { NextPage } from "next";

const LoadingPage: NextPage = () => {
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <img src="/loading2.gif"/>
            </div>
        </>
    );
}

export default LoadingPage;
