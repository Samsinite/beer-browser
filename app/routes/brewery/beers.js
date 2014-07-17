export default Ember.Route.extend({
	model: function() {
		var brewery = this.modelFor('brewery');

		return brewery.get('beers');
	}
});