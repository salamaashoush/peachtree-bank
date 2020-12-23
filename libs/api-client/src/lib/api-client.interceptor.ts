import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientConfig } from './api-client-config';
import { IApiClientConfig } from './types';

@Injectable()
export class ApiClientInterceptor implements HttpInterceptor {
  private baseUrl = '/api';
  constructor(@Inject(ApiClientConfig) config: IApiClientConfig) {
    this.baseUrl = config.baseUrl;
  }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const url = /^((http|https):\/\/)/.test(req.url)
      ? req.url
      : `${this.baseUrl}/${req.url}`;
    const apiReq = req.clone({ url });
    return next.handle(apiReq);
  }
}
