export default Ember.ArrayController.extend({
	searchTypes: ["locality", "postalCode", "region"],
	queryParams: ['searchType', 'searchInput'],
	searchType: "locality",
	searchInput: null,

	/*
	    The controller be default just proxys to the object, so lets
	    actaully have it grab the brewery data since I don't really care
	    much about the location.
	*/
	name: Ember.computed.alias('brewery.name'),
	description: Ember.computed.alias('brewery.description'),
	imageMedium: Ember.computed.alias('brewery.imageMedium'),

	searchPlaceholder: function() {
		return "enter " + this.get('searchType').replace(/([a-z])([A-Z])/g, '$1-$2');
	}.property('searchType'),

	actions: {
	}
});