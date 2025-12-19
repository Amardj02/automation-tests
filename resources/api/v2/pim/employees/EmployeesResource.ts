import { ResourceBase } from '../../../../ResourceBase';

export class EmployeesResource extends ResourceBase {
  private endpoint = 'api/v2/pim/employees';

  async createEmployee(payload: any, auth?: string) {
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
