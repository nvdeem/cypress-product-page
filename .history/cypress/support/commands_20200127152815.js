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
