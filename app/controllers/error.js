export default Ember.ObjectController.extend({
	errorMessage: Ember.computed.alias('responseJSON.errorMessage')
});