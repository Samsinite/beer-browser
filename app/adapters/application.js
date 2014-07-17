var BreweryDBAdapter = DS.RESTAdapter.extend({
});

BreweryDBAdapter.reopen({
	host: 'http://0.0.0.0:4200',
	namespace: 'v2',

	/*
	    My demo app key, feel free to instead create your own at:
	       http://www.brewerydb.com/developers
	*/
	// key: 'aee3bbac27f0386b09cb803ca9ffefa2',
	// key: 'c6db5f37599bf5506f84e8151ecc3954',
	// key: '87b1c0f246bb95c6f1220478297fc57c',
	key: '09eb2c607d11d139d6466c7b2e2c2299',

	headers: {
		"HTTP_ACCEPT": "application/json"
	},

	/*
	    We need to set the application key above as a param to every breweryDB request.
	*/
	ajax: function(url, type, hash) {
		if (Ember.isEmpty(hash)) {
			hash = {};
		}

		if (Ember.isEmpty(hash.data)) {
			hash.data = {};
		}

		hash.data.key = this.key;
		return this._super(url, type, hash);
	},

	/*
	    We are going to be using this method for searching. The store
	    will be calling this instead of us calling it directly. Since
	    we need to call a different URI than the model's standard
	    URI, we cannot use buildURL to build the URI based off of
	    the model's name.
	*/
	findUriQuery: function(store, uri, query) {
		var url    = [],
		    host   = Ember.get(this, 'host'),
		    prefix = this.urlPrefix();

		if (uri) {
			url.push(uri);
		}

		if (prefix) {
			url.unshift(prefix);
		}

		url = url.join('/');
		if (!host && url) {
			url = '/' + url;
		}

		return this.ajax(url, 'GET', { data: query });
	},

	/*
	    Since a singular name is expected when looking up a specific
	    model, we need to check for an id and if so, return a singular
	    url instead of plural.
	*/
	buildURL: function(type, id) {
		var url    = [],
		    host   = Ember.get(this, 'host'),
		    prefix = this.urlPrefix();

		if (id) {
			if (type) {
				url.push(this.pathForType(type));
			}
			url.push(id);
		}
		else {
			if (type) {
				url.push(Ember.String.pluralize(this.pathForType(type)));
			}
		}

		if (prefix) {
			url.unshift(prefix);
		}

		url = url.join('/');
		if (!host && url) {
			url = '/' + url;
		}

		return url;
	},

	pathForType: function(type) {
		return type.toLowerCase();
	}
});

export default BreweryDBAdapter;
