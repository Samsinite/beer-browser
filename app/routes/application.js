export default Ember.Route.extend({
	actions: {
		goToHome: function() {
			this.transitionTo('home');
		}
	}
});