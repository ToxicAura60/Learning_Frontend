import { DomainError } from "./domain.error";

export class UserError extends DomainError {}

export class EmailAlreadyInUseError extends UserError {
  constructor() {
    super("USER_001", "Email is already in use");
  }
}
