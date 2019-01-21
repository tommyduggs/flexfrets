app.controller("MainCtrl", ["$scope", "FretboardService", "GuitarHelperService", function($scope, FretboardService, GuitarHelperService) {
	//TODO default values in FreboardService then get them
	$scope.notes = ["G#/Ab","A","A#/Bb","B","C","C#/Db","D","D#/Eb","E","F","F#/Gb","G"];
	$scope.strings = ["E","A","D","G","B","E"];
	$scope.keyRoot = "C";
	$scope.currentScaleName = "Major scale";
	$scope.currentScaleIndex = 0;
	$scope.flatNotation = false;
	$scope.isMinor = false;
	$scope.showTuner = false;
	$scope.showAllNotes = false;
	$scope.showKeyDropdown = false;
	$scope.showScaleDropdown = false;
	$scope.showOverlay = false;
	$scope.scales = GuitarHelperService.scales;

	// Initialize fretboard
	$scope.fretboard = FretboardService.getFretboard();

	var currentString;

	//TODO maybe clean this file up

	$scope.changeKey = function (keyRoot) {
		$scope.keyRoot = trimNoteName(keyRoot);
		FretboardService.changeKey($scope.keyRoot);
		$scope.fretboard = FretboardService.getFretboard();
		$scope.showKeyDropdown = false;
	}

	$scope.changeScale = function (scaleIndex, scaleName) {
		//TODO figure out why this needs to be a scope variable
		$scope.currentScaleIndex = scaleIndex;
		$scope.currentScaleName = scaleName;
		FretboardService.changeScale(scaleIndex);
		$scope.fretboard = FretboardService.getFretboard();
		$scope.showScaleDropdown = false;
	}

	//TODO give this a better name
	$scope.changeFlatsSharps = function (flatNotation) {
		$scope.flatNotation = flatNotation;
		FretboardService.changeNotation(flatNotation);
		$scope.fretboard = FretboardService.getFretboard();
	}

	$scope.changeTuning = function (newNote) {
		//TODO get rid of trimNoteName, find a better way to do this
		newNote = trimNoteName(newNote);
		$scope.strings[currentString] = newNote;
		FretboardService.changeTuning($scope.strings);
		$scope.fretboard = FretboardService.getFretboard();
		$scope.showTuner = false;
	}

	$scope.toggleTuner = function (selectedString) {
		currentString = selectedString;
		$scope.showTuner = !$scope.showTuner;
		$scope.showKeyDropdown = false;
	}

	$scope.toggleKeyDropdown = function () {
		$scope.showTuner = false;
		$scope.showKeyDropdown = !$scope.showKeyDropdown;
	}

	$scope.toggleScaleDropdown = function () {
		$scope.showTuner = false;
		$scope.showKeyDropdown = false;
		$scope.showScaleDropdown = !$scope.showScaleDropdown;
	}

	$scope.isNoteActive = function (string) {
		if (!$scope.showTuner) {
			return false;
		}

		return (currentString == string);
	}

	var trimNoteName = function (noteName) {
		//If X#/Yb -> X#
		if (noteName.length > 2) {
			noteName = noteName.substring(0,2);
		}
		return noteName;
	}
}]);