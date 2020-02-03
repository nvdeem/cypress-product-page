let urls = [];

describe('should', () => {
	before(() => {
		cy.request({
			url: `https://catalogueservice.products-staging.ao.com/api/v1/GetListerPage`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Catalogue-Service-Api-Key': '249986b4-b19b-4a01-b4c7-f0103aad7d11'
			},
			body: {
				CatalogueQuery: {
					CategoryIds: [1],
					Formatting: {
						StartIndex: 0,
						PageSize: 10
					},
					ProductStates: ['LiveProduct']
				},
				CompanyId: 1
			}
		})
			.then(data => {
				return data.body.Response.Products.map(p => {
					url: `https://staging-aol.ao-qa.com${p.ProductLink}`;
				});
			})
			.as('response');
	});
	// .then(data => {
	// 	urls = data.body.Response.Products.map(
	// 		p => `https://staging-aol.ao-qa.com${p.ProductLink}`
	// 	);
	// });

	it('hello', () => {
		cy.get('@response').each((url, i) => {
			cy.visit(url);
			cy.get('.hero-image').should('be.visible');
			expect(url).to.equal(url);
		});
	});

	// urls.map(url => {
	// 	console.log(url);
	// 	describe(`PREMIUM PRODUCT \n url: ${url}`, () => {
	// 		sizes.map(size => {
	// 			it(`should display the hero image on ${size}`, () => {
	// 				cy.visit(url);
	// 				cy.viewport(size);

	// 				cy.get('.hero-image').should('be.visible');
	// 			});

	// 			it(`should display the image thumbnails on ${size}`, () => {
	// 				cy.visit(url);
	// 				cy.viewport(size);

	// 				cy.get('.thumbsHolder').should('be.visible');
	// 			});

	// 			it(`should navigate the carousel (left and right arrows) on ${size}`, () => {
	// 				cy.visit(url);
	// 				cy.viewport(size);

	// 				cy.get('#mediaGallery').should('be.visible');
	// 				cy.get('#galleryThumbs > #mediaGalleryNext').click();
	// 				cy.get('#carousel-right-image').should('be.visible');
	// 				cy.get('#galleryThumbs > #mediaGalleryNext')
	// 					.click()
	// 					.click();
	// 				cy.get('#mediaGalleryPrev').click();
	// 				cy.get('#carousel-left-image').should('be.visible');
	// 			});

	// 			it(`should play the "See it in action" video on click on ${size}`, () => {
	// 				cy.visit(url);
	// 				cy.viewport(size);

	// 				cy.get('#galleryThumbs > #mediaGalleryNext')
	// 					.click()
	// 					.click();
	// 				cy.playGalleryVideo();
	// 				cy.wait(3000);
	// 				cy.get('#mediaGalleryVideo .vjs-current-time-display').should(
	// 					'have.text',
	// 					'0:03'
	// 				);
	// 			});

	// 			it(`should zoom into the image on click on ${size}`, () => {
	// 				cy.visit(url);
	// 				cy.viewport(size);

	// 				cy.get('[data-thumb-index="2"]').click();
	// 				cy.get('#zoom').click();
	// 				cy.get('#zoomImg').should('be.visible');
	// 			});
	// 		});
	// 	});
	// });

	// expect(true).to.be.true;
});
