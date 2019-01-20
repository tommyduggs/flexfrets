/**
 * Stateful service that will manage the current fretboard
 * @class FretboardService
 */
app.service('FretboardService', ['GuitarHelperService', function(GuitarService) {

	var settings = {
		//TODO maybe rename to currentTuningArray? Look up naming conventions
		currentTuning: ["E","B","G","D","A","E"],
		currentScale: 0,
		currentKey: "C",
		//TODO rename to flatNotation or something
		isFlat: false
	}

	var changeKey = function (rootNote) {
		settings.currentKey = rootNote;
	}

	var changeTuning = function (tuning) {
		settings.currentTuning = tuning;
	}

	var changeScale = function (scale) {
		settings.currentScale = scale;
	}

	var changeNotation = function (flatNotation) {
		settings.isFlat = flatNotation;
	}

	var getFretboard = function () {
		return GuitarHelperService.buildFretboard(settings);
	}

	this.changeKey = changeKey;
	this.changeTuning = changeTuning;
	this.changeScale = changeScale;
	this.getFretboard = getFretboard;

}]);