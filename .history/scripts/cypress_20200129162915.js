const cypress = require('cypress');
const { merge } = require('mochawesome-merge');

async function runTests() {
	await cypress.run();
	const jsonReport = await merge();
}

runTests();
