export default Ember.ObjectController.extend({
	actions: {
		selectBrewery: function(brewery) {
			this.transitionToRoute('brewery.index', brewery);
		}
	}
});