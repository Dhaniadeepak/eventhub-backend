export class ApiError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(statusCode: number, message: string, isOperational = true, stack = '') {
    super(message)
    Object.setPrototypeOf(this, ApiError.prototype)
    this.statusCode = statusCode
    this.isOperational = isOperational
    Error.captureStackTrace(this, this.constructor) 
  }
}