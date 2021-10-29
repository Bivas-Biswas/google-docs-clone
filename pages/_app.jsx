import '@material-tailwind/react/tailwind.css';
import 'tailwindcss/tailwind.css';

import Head from 'next/head';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  // console.log(pageProps);
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
        <Component pageProps={{ ...pageProps }} />
      </Provider>
    </>

  );
}

export default MyApp;
