// pages/_app.tsx
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import initKeycloak from '../utils/keycloakConfig';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
   // initKeycloak(); // Initialize Keycloak only on the client-side
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
