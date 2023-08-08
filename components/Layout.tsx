// components/Layout.tsx
import { useEffect, useState } from 'react'; 
import Nav from './Nav';
 

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

 
  return (
    <div>
      <Nav></Nav> 
        {children}  
    </div>
  );
};

export default Layout;
