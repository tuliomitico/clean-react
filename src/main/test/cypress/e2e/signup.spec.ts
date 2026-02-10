import { faker } from '@faker-js/faker';
import * as FormHelper from '../support/form-helper';
import * as Http from '../support/signup-mock';

const simulateValidSubmit = (): void => {
  cy.getByTestId('name').focus().type(faker.name.fullName())
  cy.getByTestId('email').focus().type(faker.internet.email())
  const password = faker.string.alphanumeric(7)
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
  cy.getByTestId('submit').click()
}

describe("SignUp", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });
  it("Should load with correct initial state", () => {
    cy.getByTestId('name').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('name', 'Campo obrigatório')
    cy.getByTestId('email').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')
    cy.getByTestId("submit").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });

  it("Should present error state if form is invalid", () => {
    cy.getByTestId('name').focus().type(faker.string.alphanumeric(3))
    FormHelper.testInputStatus('name', 'Valor inválido')

    cy.getByTestId('email').focus().type(faker.lorem.word())
    FormHelper.testInputStatus('email', 'Valor inválido')

    cy.getByTestId('password').focus().type(faker.string.alphanumeric(4))
    FormHelper.testInputStatus('password', 'Valor inválido')

    cy.getByTestId('passwordConfirmation').focus().type(faker.string.alphanumeric(3))
    FormHelper.testInputStatus('passwordConfirmation', 'Valor inválido')

    cy.getByTestId("submit").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });

  it("Should present valid state if form is valid", () => {
    cy.getByTestId('name').focus().type(faker.person.fullName())
    FormHelper.testInputStatus('name')

    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')

    const password = faker.string.alphanumeric(5)

    cy.getByTestId('password').focus().type(password)
    FormHelper.testInputStatus('password')

    cy.getByTestId('passwordConfirmation').focus().type(password)
    FormHelper.testInputStatus('passwordConfirmation')



    cy.getByTestId("submit").should("not.have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });

  it("Should present EmailInUseError on 403", () => {
    Http.mockEmailInUseError()
    simulateValidSubmit()
    FormHelper.testMainError('Esse e-mail já está em uso.')
    FormHelper.testUrl('/signup')
  });

  it("Should present UnexpectedError on any other errors", () => {
    Http.mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve.')
    FormHelper.testUrl('/signup')
  });

  it("Should present save accessToken if valid credentials are provided", () => {
    Http.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.string.alphanumeric(5))
    cy.getByTestId("submit").click()

    cy.getByTestId('error-wrap').should('not.have.descendants')
    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken')
  });

  it("Should present UnexpectedError if invalid data is returned", () => {
    Http.mockInvalidData()
    simulateValidSubmit()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.string.alphanumeric(5)).type('{enter}')

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu.');
    FormHelper.testUrl('/login')
  });

  it("Should prevent multiple submits", () => {
    Http.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.string.alphanumeric(5))
    cy.getByTestId("submit").dblclick()
    FormHelper.testHttpCallsCount(1)
  });

  it("Should not call submit if form is invalid", () => {
    Http.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    FormHelper.testHttpCallsCount(0)
  });
});
