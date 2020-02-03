const sizes = ['macbook-15', 'ipad-2'];
const urls = [
	'/product/ww80j5555fc-samsung-ecobubble-washing-machine-silver-46320-1.aspx',
	'/product/43um7400plb-lg-um7400-tv-grey-67807-108.aspx'
];

urls.forEach(url => {
	describe(`STANDARD PRODUCT \n url: ${url}`, () => {
		sizes.forEach(size => {
			it(`should navigate the carousel (left and right arrows) on ${size}`, () => {
				cy.visit(url);
				cy.viewport(size);

				cy.get('[data-testid=carousel-centre-image]').should('be.visible');
				cy.get('#mediaGalleryNext').click();
				cy.get('[data-testid=carousel-centre-image]').should('be.visible');
				cy.get('#mediaGalleryNext').click();
				cy.get('[data-testid=carousel-right-image]').should('not.be.visible');
				cy.get('#mediaGalleryPrev')
					.click()
					.click();
				cy.get('[data-testid=carousel-left-image]').should('be.visible');
			});

			it(`should play the "See it in action" video on click on ${size}`, () => {
				cy.visit(url);
				cy.viewport(size);

				cy.playGalleryVideo();
				cy.wait(3000);
				cy.get('#mediaGalleryVideo .vjs-current-time-display').should(
					'have.text',
					'0:03'
				);
			});

			// it(`should display the "360 Tour" on click on ${size}`, () => {
			// 	cy.visit(url);
			// 	cy.viewport(size);

			// 	cy.get('#threeSixty').click();
			// 	cy.get('#threeSixtyCanvas').should('be.visible');
			// 	cy.wait(2000);
			// });

			it(`should zoom into the image on click on ${size}`, () => {
				cy.visit(url);
				cy.viewport(size);

				cy.get('#galleryExtraClose').should('not.be.visible');
				cy.get('[data-testid=carousel-centre-image]').click();
				cy.get('#galleryExtraClose').should('be.visible');
				cy.get('.icon-plus').should('be.visible');
				cy.get('.icon-minus').should('be.visible');
			});
		});
	});
});
