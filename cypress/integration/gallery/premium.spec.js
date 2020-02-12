const sizes = ['macbook-15', 'ipad-2'];

beforeEach(() => {
	console.log(Cypress.env('premiumProducts'));
});

Cypress.env('premiumProducts').map(url => {
	describe(`PREMIUM PRODUCT \n url: ${url}`, () => {
		sizes.forEach(size => {
			it(`should display the hero image on ${size}`, () => {
				cy.viewport(size);
				cy.visit(url);

				cy.get('.hero-image').should('be.visible');
			});

			it(`should display the image thumbnails on ${size}`, () => {
				cy.viewport(size);
				cy.visit(url);

				cy.get('.thumbsHolder').should('be.visible');
			});

			it(`should navigate the carousel (left and right arrows) on ${size}`, () => {
				cy.viewport(size);
				cy.visit(url);

				cy.get('#mediaGallery').should('be.visible');
				cy.get('#galleryThumbs > #mediaGalleryNext').click();
				cy.get('#carousel-right-image').should('be.visible');
				cy.get('#galleryThumbs > #mediaGalleryNext')
					.click()
					.click();
				cy.get('#mediaGalleryPrev').click();
				cy.get('#carousel-left-image').should('be.visible');
			});
		});
	});
});
