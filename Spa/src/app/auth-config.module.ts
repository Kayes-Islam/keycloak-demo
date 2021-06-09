import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthModule, LogLevel, OidcConfigService } from 'angular-auth-oidc-client';

export const configureAuth = (oidcConfigService: OidcConfigService) => {
  return () => {
    oidcConfigService.withConfig({
      stsServer: 'http://localhost:8080/auth/realms/AuthDemoRealm',
      authWellknownEndpoint: 'http://localhost:8080/auth/realms/AuthDemoRealm/.well-known/openid-configuration',
      redirectUrl: `${window.location.origin}/home`,
      clientId: 'auth-demo-spa',
      scope: 'openid profile email',
      responseType: 'code',
      triggerAuthorizationResultEvent: true,
      postLogoutRedirectUri: `${window.location.origin}/home`,
      startCheckSession: false,
      postLoginRoute: '',
      unauthorizedRoute: '/unauthorized',
      logLevel: LogLevel.Debug
    });
  };
};

@NgModule({
  imports: [AuthModule.forRoot()],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
