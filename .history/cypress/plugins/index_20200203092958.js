// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
// `on` is used to hook into various events Cypress emits
// `config` is the resolved Cypress config

const fetch = require('node-fetch');

module.exports = async (on, config) => {
	const productPageUrls = await new Promise((res, rej) => {
		fetch('http://catalogueservice.products-live.ao.com/api/v1/GetListerPage', {
			method: 'POST',
			body: JSON.stringify({
				CatalogueQuery: {
					CategoryIds: [99],
					SearchText: null,
					Criteria: [],
					Formatting: {
						StartIndex: 0,
						PageSize: 10,
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
		})
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
