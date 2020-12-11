import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable()
export class RequestService {

  constructor() { }

  get baseUrl(): string {
    const hostname: string = environment.api.protocol + '://' + environment.api.hostname;
    const port: string = environment.api.port ? `:${environment.api.port}` : '';
    const context: string = environment.api.context ? `/${environment.api.context}` : '';

    return hostname + port + context;
  }

}
