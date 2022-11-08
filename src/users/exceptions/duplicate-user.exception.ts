export class DuplicateUserException extends Error {
  constructor() {
    super('User already exists');
  }
}
