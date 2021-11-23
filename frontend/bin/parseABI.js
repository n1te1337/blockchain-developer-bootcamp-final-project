var fs = require('fs');
var jsonFile = '../build/contracts/Vendor.json';
var parsed= JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;
console.log(JSON.stringify(abi, null, 2));