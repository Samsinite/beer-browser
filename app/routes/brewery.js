export default Ember.Route.extend({
	model: function(params) {
		return this.store.find('brewery', params.brewery_id);
	}
});