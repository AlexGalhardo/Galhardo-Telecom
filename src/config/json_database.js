import fs from 'fs-extra'

const json_database = JSON.parse(fs.readFileSync('/data/users.json'));

export default json_database
