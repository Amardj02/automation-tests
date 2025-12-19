import { APIRequestContext, APIResponse } from '@playwright/test';

export abstract class ResourceBase {
  protected request: APIRequestContext;
  protected auth: string; 
  protected response!: APIResponse;

  constructor(request: APIRequestContext, auth: string) {
    this.request = request;
    this.auth = auth;
  }
  

  protected async handleResponse(expectedStatus?: number): Promise<void> {
    const status = this.response.status();
    if (expectedStatus && status !== expectedStatus) {
      throw new Error(`Expected status ${expectedStatus} but got ${status}`);
    }
  }

  protected async logResponse(): Promise<void> {
    const status = this.response.status();
    console.log(`Received ${status} - ${this.response.statusText()}`);
    try {
      const json = await this.response.json();
      console.log('Response JSON:', JSON.stringify(json, null, 2));
    } catch {
      console.log('Response is not JSON');
    }
  }
  protected getAuth(overrideAuth?: string): string {
    return overrideAuth || this.auth;
  }

}
