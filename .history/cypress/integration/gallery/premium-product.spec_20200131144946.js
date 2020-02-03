const fetch = require('node-fetch');
const sizes = ['macbook-15', 'ipad-2'];
let urls = [];

describe('GET PRODUCT URLS', async () => {
	before(() => {
		urls = [...urls, cy.getProductLinks(1, 'beta', 1)];
	});

	urls.forEach(url => {
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
