export class ClientError extends Error {
  public status: number;
  public message: string;
  public constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class IdNotFoundError extends ClientError {
  public constructor(_id: string) {
    super(404, `_id ${_id} not found`);
  }
}

export class RouteNotFoundError extends ClientError {
  public constructor(route: string) {
    super(404, `route ${route} not found`);
  }
}

export class ValidationError extends ClientError {
  public constructor(message: string) {
    super(400, message);
  }
}
