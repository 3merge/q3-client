const { setModel } = require('q3-api');
const Address = require('q3-schema-addresses');

Address.set('restify', '*');
Address.set('collectionPluralName', 'locations');
Address.set('collectionSingularName', 'location');

module.exports = setModel('locations', Address);
