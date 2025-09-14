import { useEffect } from 'react';
import Parse from '../lib/parse';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Parse.User.currentAsync().catch(console.error);
    }
  }, []);

  return <Component {...pageProps} />;
}