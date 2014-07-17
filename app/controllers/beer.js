export default Ember.ObjectController.extend({
	actions: {
		selectBeer: function(beer) {
			this.transitionToRoute('beer', beer);
		}
	}
});