export const environment = {
  production: false,
  keycloak: {
    authority: 'http://local.keycloak.com',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200/logout',
    realm: 'private-financial-manager',
    clientId: 'pfm',
  },
  idleConfig: { idle: 10, timeout: 60, ping: 10 },
};
