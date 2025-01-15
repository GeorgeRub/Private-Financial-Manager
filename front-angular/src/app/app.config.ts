import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {
  AutoRefreshTokenService,
  createInterceptorCondition, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, IncludeBearerTokenCondition,
  provideKeycloak,
  UserActivityService,
  withAutoRefreshToken
} from 'keycloak-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: 'http://local.keycloak.com',
      realm: 'private-financial-manager',
      clientId: 'pfm'
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
      })
    ],
    providers: [AutoRefreshTokenService, UserActivityService]
  });

const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(http:\/\/localhost:8080)(\/.*)?$/i,
  bearerPrefix: 'Bearer'
});


export const appConfig: ApplicationConfig = {
  providers: [provideKeycloakAngular(), {
    provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
    useValue: [urlCondition] // <-- Note that multiple conditions might be added.
  }, provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideAnimationsAsync()]
};
