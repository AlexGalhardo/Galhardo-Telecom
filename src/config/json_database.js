// import fs from 'fs-extra'

// const json_database = JSON.parse(fs.readFileSync('../data/public/database.json'));

async function getJSONDatabase() {
	const response = await fetch(`https://api.jsonbin.io/v3/b/64e3621fb89b1e2299d3f1c5`, {
		method: 'GET',
		headers: { 'X-Master-Key': '$2b$10$10eZrvYd8wMiWOlkdRHPC.t42gNn94OIivB9exDLWxYDx987rZ59y' },
	})
	const json = await response.json()

	console.log('json => ', json.record)

	return json.record
}

const json_database = await getJSONDatabase()

export default json_database
