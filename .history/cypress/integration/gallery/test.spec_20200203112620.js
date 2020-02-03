// <reference types="Cypress" />

const sizes = ['macbook-15'];

beforeEach(() => {
	console.log(Cypress.env('stagingProductPageUrls'));
});

Cypress.env('stagingProductPageUrls').forEach(url => {
	describe(`STANDARD PRODUCT \n url: ${url}`, () => {
		sizes.forEach(size => {
			it(`should navigate the carousel (left and right arrows) on ${size}`, () => {
				cy.viewport(size);
				cy.visit(url);

				cy.get('[data-testid=carousel-centre-image]').should('be.visible');
				cy.get('#mediaGalleryNext').click();
				cy.get('[data-testid=carousel-centre-image]').should('be.visible');
				cy.get('#mediaGalleryNext').click();
				cy.get('[data-testid=carousel-right-image]').should('not.be.visible');
				cy.get('#mediaGalleryPrev')
					.click()
					.click();
				cy.get('[data-testid=carousel-left-image]').should('be.visible');
			});
		});
	});
});
