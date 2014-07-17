var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
	this.resource('home', function() {
		this.route('index');
		this.route('breweries');
		this.route('beers');
	});

	this.resource('brewery', { path: '/brewery/:brewery_id' }, function() {
		this.route('index');
		this.route('beers');
	});

	this.resource('beer', { path: '/beer/:beer_id' }, function() {
		this.route('index');
	});
});

export default Router;