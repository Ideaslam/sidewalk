// components/Layout.tsx
import { useEffect, useState } from 'react';
import keycloak from '../utils/keycloakConfig';
import Nav from './Nav';
import AuthButtons from './AuthButtons';

const Layout = ({ children }:any) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // const checkAuth = async () => {
    //   if ((await keycloak()).authenticated) {
    //     console.log('User is authenticated.');
    //     setAuthenticated(true);
    //   } else {
    //     console.log('User is not authenticated.');
    //     setAuthenticated(false);
    //   }
    // };

    // Call checkAuth initially
   // checkAuth();
  
  }, []);

  const handleLogin = async () => {
    
    (await keycloak()).login();
  };

  return (
    <div>
      <Nav></Nav>
      {authenticated ? (
        // Render the children only when the user is authenticated
        <>{children}</>
      ) : (
        // Render a message or component when the user is not authenticated
        <div>
          <p>You need to log in to access this content.</p> 
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Layout;
