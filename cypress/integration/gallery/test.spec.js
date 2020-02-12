const sizes = ['macbook-15', 'ipad-2'];

beforeEach(() => {
	console.log(Cypress.env('standardProducts'));
});

Cypress.env('standardProducts').map(url => {
	describe(`STANDARD PRODUCT \n url: ${url}`, () => {
		sizes.forEach(size => {
			it(`should navigate the carousel (left and right arrows) on ${size}`, () => {
				cy.viewport(size);
				cy.visit(url);
				cy.triggerCarouselNavigation();
			});

			it(`should zoom into the image on click on ${size}`, () => {
				cy.viewport(size);
				cy.visit(url);

				cy.get('#galleryExtraClose').should('not.be.visible');
				cy.get('[data-testid=carousel-centre-image]').click();
				cy.get('#galleryExtraClose').should('be.visible');
				cy.get('.icon-plus').should('be.visible');
				cy.get('.icon-minus').should('be.visible');
			});
		});
	});
});
