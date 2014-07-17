export default DS.Model.extend({
	brewery: DS.belongsTo('brewery', { async: true }),

	locality: DS.attr(),
	postalCode: DS.attr(),
	region: DS.attr()
});