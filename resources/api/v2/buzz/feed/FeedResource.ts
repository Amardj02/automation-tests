import { ResourceBase } from '../../../../ResourceBase';

export class FeedResource extends ResourceBase {
  private endpoint = 'api/v2/buzz/feed';

  async getFeed(auth?: string) {
    const headers = {
      Cookie: `orangehrm=${this.getAuth(auth)}`,
      Accept: 'application/json',
    };

    await this.logRequestCookie(headers);

    this.response = await this.request.get(this.endpoint, { headers });

    await this.logResponse();
    await this.handleResponse(200);
    return this.response;
  }
}
