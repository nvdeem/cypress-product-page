const cyView = require('./node_modules/cy-view');

const devices = [
	{
		model: 'Macbook 15',
		width: 1440,
		height: 900
	},
	{
		model: 'iPad',
		width: 768,
		height: 1024
	}
	// {
	// 	model: 'iPhone X',
	// 	width: 375,
	// 	height: 812
	// }
];

const urls = [
	'/product/ww10m86dqoo-samsung-quickdrive-washing-machine-silver-52068-1.aspx'
];

const premiumProductTests = cyView(devices);

premiumProductTests(urls, () => {
	describe('Gallery UI tests (Premium)', () => {
		it('should display the hero image', () => {
			cy.get('.hero-image').should('be.visible');
		});

		it('should display the image thumbnails', () => {
			cy.get('.thumbsHolder').should('be.visible');
		});

		it('should navigate the carousel (left and right arrows)', () => {
			cy.get('#mediaGallery').should('be.visible');
			cy.get('#galleryThumbs > #mediaGalleryNext').click();
			cy.get('#carousel-right-image').should('be.visible');
			cy.get('#galleryThumbs > #mediaGalleryNext')
				.click()
				.click();
			cy.get('#mediaGalleryPrev').click();
			cy.get('#carousel-left-image').should('be.visible');
		});

		it('should play the "See it in action" video on click', () => {
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

		it('should zoom into the image on click', () => {
			cy.get('[data-thumb-index="2"]').click();
			cy.get('#zoom').click();
			cy.get('#zoomImg').should('be.visible');
		});
	});
});
