import { ResourceBase } from '../../../../ResourceBase';

export class UserResource extends ResourceBase {
  private endpoint = 'api/v2/admin/users';

  async createUser(payload: any, auth?: string) {
    const headers = {
      Cookie: `orangehrm=${this.getAuth(auth)}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await this.logRequestCookie(headers);

    this.response = await this.request.post(this.endpoint, {
      headers,
      data: payload,
    });

    await this.logResponse();
    await this.handleResponse(200);
    return this.response;
  }
}