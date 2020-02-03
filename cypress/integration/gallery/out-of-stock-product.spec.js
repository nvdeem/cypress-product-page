const sizes = ['macbook-15', 'ipad-2', 'iphone-x'];
const urls = [
	'/product/gvs169dc3-candy-grando-vita-washing-machine-white-49127-1.aspx?stubproductstate=outofstock',
	'/product/ww10m86dqoo-samsung-quickdrive-washing-machine-silver-52068-1.aspx?stubproductstate=outofstock'
];

urls.forEach(url => {
	describe(`OUT OF STOCK PRODUCT \n url: ${url}`, () => {
		sizes.forEach(size => {
			it(`should display "Back in stock soon" pill on ${size} screen`, () => {
				cy.visit(url);
				cy.viewport(size);

				cy.get('.back-in-stock-soon').should('be.visible');
			});

			it(`should allow user to add email to notify when in stock on ${size} screen`, () => {
				cy.visit(url);
				cy.viewport(size);

				cy.get('#capture-call-back').should('not.be.visible');
				cy.get('.capture__notify').should('be.visible');
				cy.get('.capture__input')
					.should('be.visible')
					.type('test@email.com');
				cy.get('.capture__button').click();
				cy.get('#capture-call-back').should('be.visible');
			});
		});
	});
});
