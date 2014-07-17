import ApplicationStore from 'beer-browser/stores/application';

export default {
	name: 'application-store',
	// before: ['ember-data'],

	initialize: function(container, app) {
		app.register('store:application', ApplicationStore);

		app.inject('route', 'application_store', 'store:application');
	}
};