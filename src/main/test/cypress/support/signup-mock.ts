import { faker } from '@faker-js/faker'
import * as Helper from '../support/http-mock'

export const mockUnexpectedError = (): void => {
  Helper.mockUnexpectedError(/signup/, 'POST')
}

export const mockEmailInUseError = (): void => {
  Helper.mockEmailInUseError(/signup/)
}

