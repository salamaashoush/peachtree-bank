import { InjectionToken } from '@angular/core';
import { IApiClientConfig } from './types';

export const ApiClientConfig = new InjectionToken<IApiClientConfig>(
  'Api client config'
);
