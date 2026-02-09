import { faker } from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("Should load with correct initial state", () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Campo obrigatório")
      .should("contain.text", "🔴");
    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Campo obrigatório")
      .should("contain.text", "🔴");
    cy.getByTestId("submit").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });

  it("Should present error state if form is invalid", () => {
    cy.getByTestId('email').focus().type(faker.lorem.word())
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Valor inválido")
      .should("contain.text", "🔴");
    cy.getByTestId('password').focus().type(faker.string.alphanumeric(4))
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Valor inválido")
      .should("contain.text", "🔴");
    cy.getByTestId("submit").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });

  it("Should present valid state if form is valid", () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Tudo certo!")
      .should("contain.text", "🟢");
    cy.getByTestId('password').focus().type(faker.string.alphanumeric(5))
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Tudo certo!")
      .should("contain.text", "🟢");
    cy.getByTestId("submit").should("not.have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });

  it("Should present error if invalid credentials are provided", () => {
    cy.intercept('POST', /login/, {
      statusCode: 401,
      body: {
        error: faker.lorem.words()
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.string.alphanumeric(5))
    cy.getByTestId("submit").click()
    cy.getByTestId("error-wrap")
      .getByTestId('spinner').should("exist")
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Credenciais inválidas');
    cy.intercept('POST', /login/, {
      statusCode: faker.helpers.arrayElement([400, 500, 404]),
      body: {
        error: faker.lorem.words()
      }
    })
    cy.url().should("eq", `${baseUrl}/login`);
  });

  it("Should present save accessToken if valid credentials are provided", () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.string.uuid()
      }
    })
    cy.getByTestId('email').focus().type("mango@gmail.com")
    cy.getByTestId('password').focus().type("12345")
    cy.getByTestId("submit").click()
    cy.getByTestId("error-wrap")
      .getByTestId('spinner').should("exist")
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
    cy.url().should("eq", `${baseUrl}/`);
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  });
});
