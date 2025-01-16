import {createInterceptorCondition, IncludeBearerTokenCondition} from 'keycloak-angular';

export const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(http:\/\/localhost:8080)(\/.*)?$/i,
  bearerPrefix: 'Bearer'
});
