import { faker } from '@faker-js/faker'
import * as Helper from '../support/http-mock'


export const mockEmailInUseError = (): void => {
  Helper.mockEmailInUseError(/signup/)
}

