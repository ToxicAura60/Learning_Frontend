export abstract class DomainError extends Error {
  public code: string
  constructor({
    code,
    message
  }: {
    code: string,
    message?: string
  }) {
    super(message)
    this.code = code
  }
}


export class ResourceAlreadyExistsError extends DomainError {
  constructor(message: string) {
    super({
      code: "RESOURCE_ALREADY_EXISTS",
      message: message
    })
  }
}

export class UnknownError extends DomainError {
  constructor(message?: string) {
    super({
      code: "UNKNOWN_ERROR",
      message: message ?? "Something went wrong"
    })
  }
}


