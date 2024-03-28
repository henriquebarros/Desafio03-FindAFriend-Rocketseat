export class UnregisteredAddressError extends Error {
  constructor() {
    super('Unregistered Address.')
  }
}
