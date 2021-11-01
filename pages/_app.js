import '@material-tailwind/react/tailwind.css';
import 'tailwindcss/tailwind.css';
import '../style/customTailwind.css';
import '../style/loader.css';

import Head from 'next/head';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Google Docs</title>
        <link rel='shortcut icon' href='/favicon.ico' />
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        />

      </Head>
      <Provider session={pageProps.session}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Provider>
    </>

  );
}

export default MyApp;