import { ResourceBase } from '../../../../ResourceBase';

export class SharesResource extends ResourceBase {
  private baseEndpoint = 'api/v2/buzz/shares';

  async likePost(shareId: string, auth?: string) {
    const endpoint = `${this.baseEndpoint}/${shareId}/likes`;

    this.response = await this.request.post(endpoint, {
      headers: {
        Cookie: `orangehrm=${this.getAuth(auth)}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    await this.logResponse();
    await this.handleResponse(200);
    return this.response;
  }
}
