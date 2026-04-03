export class RepositoryError extends Error {}

export class UniqueConstraintViolationError extends RepositoryError {
  public fields?: string[]

  constructor(fields?: string[]) {
    super()

    this.fields = fields
  }
}
