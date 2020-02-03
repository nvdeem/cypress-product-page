/// <reference types="Cypress" />

beforeEach(() => {
	console.log(Cypress.env('productPageUrls'));
});

describe('Product Page', () => {
	it('Should load the urls', () => {
		Cypress.env('productPageUrls').map(url => {
			cy.visit(`https://ao.com${url}`);
			cy.get('.btn-add-to-basket').should('be.visible');
		});
	});
});
