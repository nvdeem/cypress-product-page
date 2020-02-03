const cyView = require('./node_modules/cy-view');

const devices = [
	{
		model: 'Macbook 15',
		width: 1440,
		height: 900
	}
	// {
	// 	model: 'iPad',
	// 	width: 768,
	// 	height: 1024
	// }
	// {
	// 	model: 'iPhone X',
	// 	width: 375,
	// 	height: 812
	// }
];

const urls = [
	// '/product/ww80j5555fc-samsung-ecobubble-washing-machine-silver-46320-1.aspx'
	'/product/gvs169dc3-candy-grando-vita-washing-machine-white-49127-1.aspx'
	// '/product/rs68n8240s9-samsung-rs8000-american-fridge-freezer-stainless-steel-56635-27.aspx'
];

const standardProductTests = cyView(devices);

standardProductTests(urls, () => {
	describe('Gallery UI tests (Premium)', () => {
		it('should navigate the carousel (left and right arrows)', () => {
			cy.get('[data-testid=carousel-centre-image]').should('be.visible');
			cy.get('#mediaGalleryNext').click();
			cy.get('[data-testid=carousel-centre-image]').should('be.visible');
			cy.get('#mediaGalleryNext').click();
			cy.get('[data-testid=carousel-right-image]').should('not.be.visible');
			cy.get('#mediaGalleryPrev').dblclick();
			cy.get('[data-testid=carousel-left-image]').should('be.visible');
		});

		it('should play the "See it in action" video on click', () => {
			cy.playGalleryVideo();
			cy.wait(3000);
			cy.get('#mediaGalleryVideo .vjs-current-time-display').should(
				'have.text',
				'0:03'
			);
		});

		it('should display the "360 Tour" on click', () => {
			cy.get('#threeSixty').click();
			cy.get('#threeSixtyCanvas').should('be.visible');
			cy.wait(2000);
		});

		it('should zoom into the image on click', () => {
			cy.get('#galleryExtraClose').should('not.be.visible');
			cy.get('[data-testid=carousel-centre-image]').click();
			cy.get('#galleryExtraClose').should('be.visible');
			cy.get('.icon-plus').should('be.visible');
			cy.get('.icon-minus').should('be.visible');
		});
	});
});
