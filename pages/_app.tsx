import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "nprogress/nprogress.css";
import "swiper/css";
import "swiper/css/navigation";

import Layout from "../components/Layout";
import NProgress from "nprogress";
import Router from "next/router";
import { AppPropsWithLayout } from '../models/layout';
import instance from '../api/config';
import { SWRConfig } from "swr";
import {SessionProvider} from 'next-auth/react'


NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});
Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const LayoutWrapper = Component.Layout ?? Layout;
  return <SessionProvider session={pageProps.session}>
    <LayoutWrapper>
    <SWRConfig
      value={{
        fetcher: async (url: string) => instance.get(url),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  </LayoutWrapper>
  </SessionProvider>
}

export default MyApp
