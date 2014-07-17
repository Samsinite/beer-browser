import BreweryDBSerializer from 'beer-browser/serializers/application';

export default BreweryDBSerializer.extend({
	/*
	    Because image data for a beer is returned from breweryDB (http://www.brewerydb.com/developers/docs-endpoint/beer_index)
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
		if (hash.labels) {
			/*
			    We have images so lets convert this puppy to something
			    that our ember-data model can handle/serialize for us :)
			*/
			if (hash.labels.icon) {
				hash.iconLabelUrl = hash.labels.icon;
			}
			if (hash.labels.medium) {
				hash.mediumLabelUrl = hash.labels.medium;
			}
			if (hash.labels.large) {
				hash.largeLabelUrl = hash.labels.large;
			}

		}

		this._super.apply(this, arguments); // Continue to serialize the magic!
	}
});