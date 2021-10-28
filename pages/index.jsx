import Head from 'next/head';

import Header from '../components/Header';

function Home() {
  return (
    <div>
      <Head>
        <title>Google Docs</title>
      </Head>
      <Header />
    </div>
  );
}

export default Home;
