// <reference types="Cypress" />

const sizes = ['macbook-15', 'iphone-x'];

beforeEach(() => {
	console.log(Cypress.env('productPageUrls'));
});

Cypress.env('productPageUrls').forEach(url => {
	describe(`STANDARD PRODUCT \n url: ${url}`, () => {
		sizes.map(size => {
			it(`should navigate the carousel (left and right arrows) on ${size}`, () => {
				cy.visit(url);
				cy.viewport(size);

				cy.get('.btn-add-to-basket').should('be.visible');
			});
		});
	});
});
