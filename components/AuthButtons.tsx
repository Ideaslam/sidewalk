// components/AuthButtons.tsx
import { useEffect, useState } from 'react';
import keycloak from '../utils/keycloakConfig';
 

const AuthButtons = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if ((await keycloak()).authenticated) {
        console.log('User is authenticated.');
        setAuthenticated(true);
      } else {
        console.log('User is not authenticated.');
        setAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async () => {
    
    (await keycloak()).login();
  };

  const handleLogout =async  () => {
    (await keycloak()).logout();
  };

  return (
    <div>
      {authenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default AuthButtons;
