import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptor } from './guards/custom.interceptor';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { errorInterceptor } from './guards/error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),  provideToastr(),

    { provide: 'baseUrl', useValue: 'https://localhost:7213/api',multi:true },
    { provide: HTTP_INTERCEPTORS, useValue: 'https://localhost:7213/api',multi:true },

    provideHttpClient(withInterceptors([customInterceptor,errorInterceptor])),
    importProvidersFrom([
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('accessToken'),
          allowedDomains: ['localhost:7213'],
          disallowedRoutes: []
        }
      })
    ])

   ]
};
// withInterceptors([customInterceptor])