import Navbar from '@/components/NavBar'; // Make sure the path is correct
import Head from 'next/head';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';

export default function App ({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='../../public/images/favicon.png' />
      </Head>
      <main className='bg-light w-full min-h-screen'>
        <Navbar />
        <Component key={router.asPath} {...pageProps} />
        <Footer />
      </main>
    </>
  );
}
