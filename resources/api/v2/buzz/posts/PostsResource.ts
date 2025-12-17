import { ResourceBase } from '../../../../ResourceBase';

export class PostsResource extends ResourceBase {
  private endpoint = 'api/v2/buzz/posts';

  async createPost(payload: any, auth?: string) {
    this.response = await this.request.post(this.endpoint, {
      headers: {
        Cookie: `orangehrm=${this.getAuth(auth)}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: payload,
    });
    await this.logResponse();
    await this.handleResponse(200);
    return this.response;
  }
}