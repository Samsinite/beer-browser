import BreweryDBSerializer from 'beer-browser/serializers/application';

export default BreweryDBSerializer.extend({
	extractArray: function(store, type, payload, requestType) {
		var modifiedPayload = {},
		    inflector       = Ember.Inflector.inflector,
		    data            = payload.data || [];

		payload.breweries = [];
		data.forEach(function(location) {
			var brewery = location.brewery;

			brewery.location = location.id;
			payload.breweries.push(brewery);
		});

		return this._super(store, type, payload, requestType);
	},

	keyForRelationship: function(key, relationship) {
		return key + 'Id';
	}
});