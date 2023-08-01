import next from 'next/types';
import keycloak from '../../utils/keycloakConfig';

const protectedDataHandler = async (req :any, res :any) => {
 
  try {
    const token = req.headers.authorization.split(' ')[1];
    await   (await keycloak()).init({ token: token, onLoad: 'check-sso' });
    // Verify the token and perform authorization logic
    // Your API logic here...
 
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export default protectedDataHandler;