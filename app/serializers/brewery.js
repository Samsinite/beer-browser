import BreweryDBSerializer from 'beer-browser/serializers/application';

export default BreweryDBSerializer.extend({
	/*
	    Because image data for a brewery is returned from breweryDB (http://www.brewerydb.com/developers/docs-endpoint/brewery_index)
	    like so:
	    [{
	    	id: ...,
	    	...,
	    	images: {
	    		icon: ...,
	    		medium: ...,
	    		large: ...
	    	},
	    	...
	    }, ...]

	    We need to normalize it into something easy to serialize.
	*/
	normalizeAttributes: function(type, hash) {
		if (hash.images) {
			/*
			    We have images so lets convert this puppy to something
			    that our ember-data model can handle/serialize for us :)
			*/
			if (hash.images.icon) {
				hash.imageIcon = hash.images.icon;
			}
			if (hash.images.medium) {
				hash.imageMedium = hash.images.medium;
			}
			if (hash.images.large) {
				hash.imageLarge = hash.images.large;
			}

		}

		this._super.apply(this, arguments); // Continue to serialize the magic!
	}
});