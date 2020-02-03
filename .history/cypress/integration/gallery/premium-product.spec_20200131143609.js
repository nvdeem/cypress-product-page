const fetch = require('node-fetch');
const sizes = ['macbook-15', 'ipad-2'];

const getProductLinks = (categoryId, env, clientId) => {
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
};

getProductLinks(1, 'beta', 1).then(productLinks => {
	productLinks.forEach(url => {
		describe(`PREMIUM PRODUCT \n url: ${url}`, () => {
			sizes.forEach(size => {
				it(`should display the hero image on ${size}`, () => {
					cy.visit(url);
					cy.viewport(size);

					cy.get('.hero-image').should('be.visible');
				});

				it(`should display the image thumbnails on ${size}`, () => {
					cy.visit(url);
					cy.viewport(size);

					cy.get('.thumbsHolder').should('be.visible');
				});

				it(`should navigate the carousel (left and right arrows) on ${size}`, () => {
					cy.visit(url);
					cy.viewport(size);

					cy.get('#mediaGallery').should('be.visible');
					cy.get('#galleryThumbs > #mediaGalleryNext').click();
					cy.get('#carousel-right-image').should('be.visible');
					cy.get('#galleryThumbs > #mediaGalleryNext')
						.click()
						.click();
					cy.get('#mediaGalleryPrev').click();
					cy.get('#carousel-left-image').should('be.visible');
				});

				it(`should play the "See it in action" video on click on ${size}`, () => {
					cy.visit(url);
					cy.viewport(size);

					cy.get('#galleryThumbs > #mediaGalleryNext')
						.click()
						.click();
					cy.playGalleryVideo();
					cy.wait(3000);
					cy.get('#mediaGalleryVideo .vjs-current-time-display').should(
						'have.text',
						'0:03'
					);
				});

				it(`should zoom into the image on click on ${size}`, () => {
					cy.visit(url);
					cy.viewport(size);

					cy.get('[data-thumb-index="2"]').click();
					cy.get('#zoom').click();
					cy.get('#zoomImg').should('be.visible');
				});
			});
		});
	});
});

// Tests
