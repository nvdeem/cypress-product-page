Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

Cypress.env('RETRIES', 1);

// Accept Cookie Banner
// before(() => {
// 	cy.setCookie('MKT_AOCookiebannerGDPRV2', 'accepted');
// 	Cypress.Cookies.defaults({
// 		whitelist: ['MKT_AOCookiebannerGDPRV2']
// 	});
// });

Cypress.Commands.add('playGalleryVideo', () => {
	cy.get('#playReviewVideo').should('be.visible');
	cy.get('#mediaGalleryVideo').should('not.exist');
	cy.get('#playReviewVideo').click();
	cy.get('#mediaGalleryVideo').should('be.visible');
});

Cypress.Commands.add('triggerCarouselNavigation', () => {
	cy.get('[data-testid=carousel-centre-image]').should('be.visible');
	cy.get('#mediaGalleryNext').click();
	cy.get('[data-testid=carousel-centre-image]').should('not.be.visible');
	cy.get('#mediaGalleryNext').click();
	cy.get('[data-testid=carousel-right-image]').should('not.be.visible');
	cy.get('#mediaGalleryPrev')
		.click()
		.click();
	cy.get('[data-testid=carousel-left-image]').should('be.visible');
});
