/**
 * Stateful service that will manage the current fretboard
 * @class FretboardService
 */
app.service('FretboardService', ['GuitarHelperService', function(GuitarService) {
	var guitarServiceTest = function() {
		var s = GuitarService.testFunction();
		return s;
	}

	this.guitarServiceTest = guitarServiceTest;
}]);