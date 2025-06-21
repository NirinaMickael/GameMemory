export class InternalError extends Error {
  errorCode?: string;
  constructor(data: { message: string; errorCode?: string }) {
    super(data.message);
    this.errorCode = data.errorCode;
  }

  static ERR_NETWORK = 'ERR_NETWORK';
}
