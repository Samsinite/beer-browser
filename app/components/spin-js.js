export default Ember.Component.extend({
	isSpinning: true,

	/* spinner opts */
	lines: 11, // The number of lines to draw
	length: 10, // The length of each line
	width: 4, // The line thickness
	radius: 7, // The radius of the inner circle
	corners: 1, // Corner roundness (0..1)
	rotate: 0, // The rotation offset
	direction: 1, // 1: clockwise, -1: counterclockwise
	color: '#000', // #rgb or #rrggbb or array of colors
	speed: 1.5, // Rounds per second
	trail: 60, // Afterglow percentage
	shadow: false, // Whether to render a shadow
	hwaccel: true, // Whether to use hardware acceleration
	spinnerClassName: 'spinner', // The CSS class to assign to the spinner
	zIndex: 2e9, // The z-index (defaults to 2000000000)
	top: '50%', // Top position relative to parent
	left: '50%', // Left position relative to parent

	target: function() {
		var elementId = this.get('elementId');

		if (elementId) {
			return document.getElementById(elementId);
		}
		else {
			return null;
		}
	}.property('elementId').volatile(),

	opts: function() {
		return {
			lines: this.get('lines'),
			length: this.get('length'),
			width: this.get('width'),
			radius: this.get('radius'),
			corners: this.get('corners'),
			rotate: this.get('rotate'),
			direction: this.get('direction'),
			color: this.get('color'),
			speed: this.get('speed'),
			trail: this.get('trail'),
			shadow: this.get('shadow'),
			hwaccel: this.get('hwaccel'),
			className: this.get('spinnerClassName'),
			zIndex: this.get('zIndex'),
			top: this.get('top'),
			left: this.get('left')
		};
	}.property('lines', 'length', 'width', 'radius', 'corners', 'rotate',
	           'direction', 'color', 'speed', 'trail', 'shadow', 'hwaccel',
	           'spinnerClassName', 'zIndex', 'top', 'left'),

	updateSpinnerOpts: function() {
		var spinner    = this.get('spinner'),
		    target     = this.get('target'),
		    isSpinning = this.get('isSpinning'),
		    opts       = this.get('opts');

		if (spinner && isSpinning) {
			spinner.stop();

			spinner = new Spinner(opts);
			this.set('spinner', spinner);
			spinner.spin(target);
		}
	}.observes('opts'),

	controlSpinner: function(e, view){
		var isSpinning = this.get('isSpinning'),
		    target     = this.get('target'),
		    spinner    = this.get('spinner');

		if (spinner) {
			if (!isSpinning){
				spinner.stop();
			} else {
				spinner.spin(target);
			}
		}
	}.observes('isSpinning'),

	didInsertElement: function() {
		var target     = this.get('target'),
		    opts       = this.get('opts'),
		    isSpinning = this.get('isSpinning'),
		    spinner    = new Spinner(opts);

		if (isSpinning) {
			spinner.spin(target);
		}

		this.set('spinner', spinner);
	},

	willDestroyElement: function() {
		var spinner = this.get('spinner');

		spinner.stop();
	}
});
