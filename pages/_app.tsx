import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppPropsWithLayout } from '../models/layout'
import Layout from '../components/Layout'
import "nprogress/nprogress.css";
import "swiper/css";
import "swiper/css/navigation";
import NProgress from "nprogress";
import Router from "next/router";
import { instance } from '../api/config';
import { SWRConfig } from "swr";
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux';
import { persistor, store } from '../app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});
Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const LayoutWrapper = Component.Layout ?? Layout;
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SessionProvider session={pageProps.session}>
        <LayoutWrapper>
          <SWRConfig
            value={{
              fetcher: async (url: string) => instance.get(url),
            }}
          >
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              draggable
              theme='dark'
              pauseOnHover = {false}
              pauseOnFocusLoss = {false}
            />
          </SWRConfig>
        </LayoutWrapper>
      </SessionProvider>
    </PersistGate>
  </Provider>
}

export default MyApp
