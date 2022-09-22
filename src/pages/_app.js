import Layout from '@layout/Layout';
import GlobalContextProvider from 'contexts/GlobalContext';

import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
//Route Events.
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextProvider>
  );
}

export default MyApp;
