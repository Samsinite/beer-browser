var DelayedSearchCallback = null;

export default Ember.Route.extend({
	queryParams: {
		searchInput: {
			refreshModel: true,
			replace: true
		}
	},

	/*
	    In an initializer under 'initializers/store.js', we injected
	    the Application Store under /stores/application.js into all routes
	    so that we may access this store singleton using this.applicatiin_store
	    inside of any route. Ember's DI (dependency injection) handles lazily
	    initializing this variable for us when it is first needed.
	
	    When using Ember, we want to avoid using setTimeout for delayed callbacks
	    and instead should use the Ember run loop to prevent side effects from
	    appearing.
	    Here, a delayed callback is used to avoid searches being performed for
	    every key press.  If the user delays pressing a key for 200ms, than a
	    search will be performed.
	*/
	model: function(params) {
		var beerSearchQuery = { type: "beer" },
		    self          = this;

		return new Ember.RSVP.Promise(function(resolve, reject) {
			if (DelayedSearchCallback) {
				Ember.run.cancel(DelayedSearchCallback);
			}

			DelayedSearchCallback = Ember.run.later(self, function() {
				if (params.searchInput && params.searchInput !== 'null') {
					beerSearchQuery.q = params.searchInput;
					resolve(self.application_store.findUriQuery('beer', 'search', beerSearchQuery));
				}
				else {
					resolve([]);
				}
			}, 200);
		});
	},

	afterModel: function() {
		var beersController = this.controllerFor('home.beers'); 

		beersController.set('loading', false);
		this._super.apply(this, arguments);
	},

	actions: {
		loading: function(transition, originRoute) {
			if (transition.targetName === originRoute.routeName) {
				var beersController = this.controllerFor('home.beers');

				beersController.set('loading', true);
				return false;
			}
			else {
				return true;
			}
		}
	}
});