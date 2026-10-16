export class ApiResponse<T = null> {
  public readonly success: boolean;

  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly data: T = null as T,
  ) {
    this.success = statusCode >= 200 && statusCode < 300;
  }
}

