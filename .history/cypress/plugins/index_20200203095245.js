const fetch = require('node-fetch');

module.exports = async (on, config) => {
	const productPageUrls = await new Promise((res, rej) => {
		fetch(
			'http://catalogueservice.products-staging.ao.com/api/v1/GetListerPage',
			{
				method: 'POST',
				body: JSON.stringify({
					CatalogueQuery: {
						CategoryIds: [1], //99
						SearchText: null,
						Criteria: [],
						Formatting: {
							StartIndex: 0,
							PageSize: 2,
							SortBy: null,
							ViewMode: null,
							DisableRedirect: false
						},
						ProductStates: ['LiveProduct']
					},
					CompanyId: 1
				}),
				headers: {
					'Content-Type': 'application/json',
					'X-Catalogue-Service-Api-Key': '249986b4-b19b-4a01-b4c7-f0103aad7d11'
				}
			}
		)
			.then(result => result.json())
			.then(json => res(json.Response.Products.map(p => p.ProductLink)))
			.catch(err => rej([]));
	});

	return Object.assign({}, config, {
		env: {
			productPageUrls
		}
	});
};
