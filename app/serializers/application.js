export default DS.RESTSerializer.extend({
	/*
	    Extract meta information such as the number of pages,
	    the status, message, and the current page.
	*/
	extractMeta: function(store, type, payload) {
		if (payload) {
			var meta = {};

			/* Doesn't hurt to set undefined or delete undefined :) */
			meta.status        = payload.status;
			meta.numberOfPages = payload.numberOfPages;
			meta.message       = payload.message;
			meta.currentPage   = payload.currentPage;
			meta.totalResults  = payload.totalResults;

			store.metaForType(type, meta);

			delete payload.status;
			delete payload.numberOfPages;
			delete payload.message;
			delete payload.currentPage;
			delete payload.totalResults;
		}
	},

	/*
	    We need to modify our JSON payload to fix the payload to
	    look like the expected ember-model RESTSerialzier convention
	    so that serialization can be done without a lot of customization.
	    BreweryDB returns request content inside the property called
	    'data', so we must instead convert this to a property of the expected
	    'type'.
	*/

	/*
	    Arrays need to be in a pluralized property of the types key be default,
	    so we'll use Ember's inflector to pluralize the key name.
	*/
	extractArray: function(store, type, payload, requestType) {
		var modifiedPayload = {},
		    inflector       = Ember.Inflector.inflector,
		    data            = payload.data || [];

		modifiedPayload[inflector.pluralize(type.typeKey)] = data;
		return this._super(store, type, modifiedPayload, requestType);
	},

	/*
	    This one is fairly straight forward, just move the payload into
	    another payload where whatever is contained in the 'data' property
	    is moved into a property of the the type's key.
	*/
	extractSingle: function(store, type, payload, id, requestType) {
		var modifiedPayload = {};

		modifiedPayload[type.typeKey] = payload.data || null;
		return this._super(store, type, modifiedPayload, id, requestType);
	},

	/*
	    To support the ability to query a nested relationship -- 
	    I.E. /brewery/:brewery_id/beers -- we need to set the links
	    hash to the appropriate URI to query. See:
	    http://emberjs.com/api/data/classes/DS.RESTAdapter.html#method_findHasMany
	*/
	normalizeAttributes: function(type, hash) {
		hash.links = {};
		type.eachRelationship(function(key, relationship) {
			if (relationship.kind === "hasMany") {
				hash.links[key] = key;
			}
		});

		this._super.apply(this, arguments);
	}
});