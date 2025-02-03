export const environment = {
  back_http: "http://local.pfm.com",
  api_version: "/api/v1/",
  production: false,
  keycloak: {
    authority: 'https://local.keycloak.com',
    redirectUri: 'https://local.pfm.com',
    postLogoutRedirectUri: 'https://local.pfm.com/logout',
    realm: 'private-financial-manager',
    clientId: 'pfm',
  },
  idleConfig: { idle: 10, timeout: 60, ping: 10 },
}
