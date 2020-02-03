const fetch = require('node-fetch');

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

Cypress.Commands.add('getProductLinks', (categoryId, env, clientId) => {
	return new Promise((resolve, reject) => {
		const url = `https://catalogueservice.products-${env}.ao.com/api/v1/GetListerPage`;
		const info = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Catalogue-Service-Api-Key': '249986b4-b19b-4a01-b4c7-f0103aad7d11'
			},
			body: JSON.stringify({
				CatalogueQuery: {
					CategoryIds: [categoryId],
					Formatting: {
						StartIndex: 0,
						PageSize: 10
					},
					ProductStates: ['LiveProduct']
				},
				CompanyId: clientId
			})
		};

		fetch(url, info)
			.then(response => {
				if (response.ok) return response.json();
				throw new Error(response.statusText);
			})
			.then(data => {
				const products = data.Response.Products.map(p => p.ProductLink);
				resolve(products);
			})
			.catch(err => {
				console.log(err);
				reject(err);
			});
	});
});
