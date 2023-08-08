// utils/keycloakConfig.ts
import   Keycloak from 'keycloak-js';

let keycloak: Keycloak.KeycloakInstance;

// const initKeycloak = async () => {
//   if (keycloak) {
//     return keycloak;
//   }

//   const config: Keycloak.KeycloakConfig = {
//     url:  "https://auth.apiserver.co",
//     realm:  "sidewalk",
//     clientId:  "sidewalk-nextjs",
//   };

//   keycloak = new Keycloak(config);

//   try {
//     await keycloak.init({ onLoad: 'check-sso' });
//     console.log('Keycloak initialized.');
//   } catch (error) {
//     console.error('Keycloak initialization error:', error);
//   }

//   return keycloak;
// };

// export default initKeycloak;
