var Brewery = DS.Model.extend({
	/* relationships to other models */
	beers: DS.hasMany('beer', { async: true }),
	location: DS.belongsTo('location', { async: true }),

	/* model attributes */
	name: DS.attr(),
	description: DS.attr(),
	imageIcon: DS.attr(),
	imageMedium: DS.attr(),
	imageLarge: DS.attr()
});

Brewery.reopenClass({
	FIXTURES: [
		{
			id: 1,
			name: "Ember Brewery",
			description: 'Lorem ipsum dolor sit amet, rebum elaboraret cum ea, te posse graecis eum.',

			imageLarge: 'http://www.gravatar.com/avatar/da95675075b1ba2fe0a8827698d61311/?s=400',
			imageMedium: 'http://www.gravatar.com/avatar/da95675075b1ba2fe0a8827698d61311/?s=200',
			imageIcon: 'http://www.gravatar.com/avatar/da95675075b1ba2fe0a8827698d61311/?s=30',

			beers: [1, 2]
		},
		{
			id: 2,
			name: "Angular Brewery",
			description: 'Lorem ipsum dolor sit amet, rebum elaboraret cum ea, te posse graecis eum.',

			imageLarge: 'http://www.gravatar.com/avatar/13ad4c8b818681c37ea3fb8565183d45/?s=400',
			imageMedium: 'http://www.gravatar.com/avatar/13ad4c8b818681c37ea3fb8565183d45/?s=200',
			imageIcon: 'http://www.gravatar.com/avatar/13ad4c8b818681c37ea3fb8565183d45/?s=30',

			beers: [3, 4]
		}
	]
});

export default Brewery;