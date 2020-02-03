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

Cypress.Commands.add('setupUrlAndViewport', () => {
	cy.visit(url);
	cy.viewport(size);
});
