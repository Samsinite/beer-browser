/*
    This basically just calls extract on the serializer.
*/
function _findUriQuery(adapter, store, type, uri, query, recordArray) {
	var promise = adapter.findUriQuery(store, uri, query, recordArray),
		serializer = store.serializerFor(type);

	return Ember.RSVP.resolve(promise, "DS: Handle Adapter#findUriQuery of " + type).then(function(payload) {
		/*
		    passing serializer.extract(...,'findQuery') tells the serializer
		    to use the findQuery extract method, which will work perfectly. See:
		    https://github.com/emberjs/data/blob/v1.0.0-beta.6/packages/ember-data/lib/serializers/json_serializer.js#L464
		*/
		payload = serializer.extract(store, type, payload, null, 'findQuery');

		Ember.assert("The response from a findUriQuery must be an Array, not " + Ember.inspect(payload), Ember.typeOf(payload) === 'array');

		recordArray.load(payload);
		return recordArray;
	}, null, "DS: Extract payload of findUriQuery " + type);
}

export default DS.Store.extend({
	/*
	    This just calls the above private method with the correct params
	*/
	findUriQuery: function(type, uri, query) {
		type = this.modelFor(type);

		var array = this.recordArrayManager.createAdapterPopulatedRecordArray(type, query);

		var adapter = this.adapterFor(type),
			promiseLabel = "DS: Store#findUriQuery " + type,
			resolver = Ember.RSVP.defer(promiseLabel);

		Ember.assert("You tried to load a query but you have no adapter (for " + type + ")", adapter);
		Ember.assert("You tried to load a query but your adapter does not implement `findUriQuery`", adapter.findUriQuery);

		resolver.resolve(_findUriQuery(adapter, this, type, uri, query, array));

		return DS.PromiseArray.create({ promise: resolver.promise});
	}
});
