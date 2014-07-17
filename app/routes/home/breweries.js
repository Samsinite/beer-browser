var DelayedSearchCallback = null;

export default Ember.Route.extend({
	queryParams: {
		searchType: {
			refreshModel: true,
			replace: true
		},

		searchInput: {
			refreshModel: true,
			replace: true
		}
	},

	/*
	    When using Ember, we want to avoid using setTimeout for delayed callbacks
	    and instead should use the Ember run loop to prevent side effects from
	    appearing.
	    Here, a delayed callback is used to avoid searches being performed for
	    every key press.  If the user delays pressing a key for 200ms, than a
	    search will be performed.
	*/
	model: function(params) {
		var locationQuery = {},
		    self          = this;

		return new Ember.RSVP.Promise(function(resolve, reject) {
			if (DelayedSearchCallback) {
				Ember.run.cancel(DelayedSearchCallback);
			}

			DelayedSearchCallback = Ember.run.later(self, function() {
				if (params.searchInput && params.searchInput !== 'null') {
					locationQuery[params.searchType] = params.searchInput;
					resolve(self.store.find('location', locationQuery));
				}
				else {
					resolve([]);
				}
			}, 200);
		});
	},

	afterModel: function() {
		var breweriesController = this.controllerFor('home.breweries'); 

		breweriesController.set('loading', false);
		this._super.apply(this, arguments);
	},

	actions: {
		loading: function(transition, originRoute) {
			if (transition.targetName === originRoute.routeName) {
				var breweriesController = this.controllerFor('home.breweries');

				breweriesController.set('loading', true);
				return false;
			}
			else {
				return true;
			}
		}
	}
});