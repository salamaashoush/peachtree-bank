import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiClientConfig } from './api-client-config';
import { ApiClientInterceptor } from './api-client.interceptor';
import { IApiClientConfig } from './types';

@NgModule({
  imports: [CommonModule, HttpClientModule],
})
export class ApiClientModule {
  static withConfig(
    config: IApiClientConfig
  ): ModuleWithProviders<ApiClientModule> {
    return {
      ngModule: ApiClientModule,
      providers: [
        { provide: ApiClientConfig, useValue: config },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiClientInterceptor,
          multi: true,
        },
      ],
    };
  }
}
