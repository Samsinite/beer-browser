var Beer = DS.Model.extend({
	/* relationships to other models */
	brewery: DS.belongsTo('brewery', { async: true }),

	/* model attributes */
	name: DS.attr(),
	description: DS.attr(),
	abv: DS.attr(),
	ibu: DS.attr(),
	iconLabelUrl: DS.attr('string', {defaultValue: '/assets/images/defaultBeerIcon.png'}),
	mediumLabelUrl: DS.attr('string', {defaultValue: '/assets/images/defaultBeerMedium.png'}),
	largeLabelUrl: DS.attr('string', {defaultValue: '/assets/images/defaultBeerLarge.png'})
});

Beer.reopenClass({
	FIXTURES: [
		{
			id: 1,
			name: "Ember Beer",
			description: 'This beer is the best, I MEAN THE BEST!.',
			ibu: 40,
			abv: 5.8,

			largeLabelUrl: 'http://www.gravatar.com/avatar/da95675075b1ba2fe0a8827698d61311/?s=400',
			mediumLabelUrl: 'http://www.gravatar.com/avatar/da95675075b1ba2fe0a8827698d61311/?s=200',
			iconLabelUrl: 'http://www.gravatar.com/avatar/da95675075b1ba2fe0a8827698d61311/?s=30',

			brewery: 1
		},
		{
			id: 2,
			name: "Angular Beer",
			description: 'This beer is good... better than Backbone beer.',
			ibu: 35,
			abv: 3.2,

			largeLabelUrl: 'http://www.gravatar.com/avatar/13ad4c8b818681c37ea3fb8565183d45/?s=400',
			mediumLabelUrl: 'http://www.gravatar.com/avatar/13ad4c8b818681c37ea3fb8565183d45/?s=200',
			iconLabelUrl: 'http://www.gravatar.com/avatar/13ad4c8b818681c37ea3fb8565183d45/?s=30',

			brewery: 1
		},
		{
			id: 3,
			name: "Backbone Beer",
			description: 'This beer is the best, I MEAN THE BEST!.',
			ibu: 40,
			abv: 5.8,

			largeLabelUrl: 'http://www.gravatar.com/avatar/da95675075b1ba2fe0a8827698d61311/?s=400',
			mediumLabelUrl: 'http://www.gravatar.com/avatar/da95675075b1ba2fe0a8827698d61311/?s=200',
			iconLabelUrl: 'http://www.gravatar.com/avatar/da95675075b1ba2fe0a8827698d61311/?s=30',

			brewery: 2
		},
		{
			id: 4,
			name: "jQuery Beer",
			description: 'This beer is what started everything.',
			ibu: 35,
			abv: 3.2,

			largeLabelUrl: 'http://www.gravatar.com/avatar/13ad4c8b818681c37ea3fb8565183d45/?s=400',
			mediumLabelUrl: 'http://www.gravatar.com/avatar/13ad4c8b818681c37ea3fb8565183d45/?s=200',
			iconLabelUrl: 'http://www.gravatar.com/avatar/13ad4c8b818681c37ea3fb8565183d45/?s=30',

			brewery: 2
		}
	]
});

export default Beer;