app.controller("MainCtrl", ["$scope", "GuitarHelperService", function($scope, GuitarHelperService) {
	$scope.showTunerDropdown = false;
	$scope.showRootNoteDropdown = false;
	$scope.showScaleDropdown = false;
	$scope.showOverlay = false;

	$scope.notes = GuitarHelperService.NOTES;
	$scope.scales = GuitarHelperService.SCALES;
	$scope.settings = GuitarHelperService.DEFAULT_SETTINGS;

	// Initialize fretboard
	$scope.fretboard = GuitarHelperService.getFretboard($scope.settings);

	$scope.hideAllDropdowns = function () {
		$scope.showTunerDropdown = false;
		$scope.showRootNoteDropdown = false;
		$scope.showScaleDropdown = false;
	}

	// Selected string is index of current string being tuned
	$scope.toggleTuner = function (selectedString) {
		$scope.currentString = selectedString;

		$scope.showTunerDropdown = !$scope.showTunerDropdown;
		$scope.showRootNoteDropdown = false;
		$scope.showScaleDropdown = false;
	}

	$scope.toggleRootNoteDropdown = function () {
		$scope.showTunerDropdown = false;
		$scope.showRootNoteDropdown = !$scope.showRootNoteDropdown;
		$scope.showScaleDropdown = false;
	}

	$scope.toggleScaleDropdown = function () {
		$scope.showTunerDropdown = false;
		$scope.showRootNoteDropdown = false;
		$scope.showScaleDropdown = !$scope.showScaleDropdown;
	}

	// newStartNote is index value of new starting note
	$scope.changeStartNote = function (newStartNote) {
		$scope.settings.currentStartNote = newStartNote;
		$scope.fretboard = GuitarHelperService.getFretboard($scope.settings);
		$scope.showRootNoteDropdown = false;
	}

	// newScale is index value of new scale
	$scope.changeScale = function (newScale) {
		$scope.settings.currentScale = newScale;
		$scope.fretboard = GuitarHelperService.getFretboard($scope.settings);
		$scope.showScaleDropdown = false;
	}

	// newNote is index value of new note
	$scope.changeTuning = function (newNote) {
		$scope.settings.currentTuning[$scope.currentString] = newNote;
		$scope.fretboard = GuitarHelperService.getFretboard($scope.settings);
		$scope.showTunerDropdown = false;
	}

	// flatNotation is boolean for whether current notation is flats
	// if false, then current notation is sharps
	$scope.changeNotation = function (flatNotation) {
		$scope.settings.flatNotation = flatNotation;
		$scope.fretboard = GuitarHelperService.getFretboard($scope.settings);
	}
}]);