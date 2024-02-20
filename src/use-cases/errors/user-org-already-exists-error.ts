export class UserOrgAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists')
  }
}
