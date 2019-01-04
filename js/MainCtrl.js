app.controller("MainCtrl", ["$scope", "GuitarService", function($scope, GuitarService) {
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
	$scope.fretboard = GuitarService.getFretboard();

	$scope.scales = GuitarService.scales;

	var currentString;

	$scope.changeKey = function (keyRoot) {
		$scope.keyRoot = trimNoteName(keyRoot);
		GuitarService.changeKey($scope.keyRoot,$scope.isMinor);
		$scope.fretboard = GuitarService.getFretboard();
		$scope.showKeyDropdown = false;
	}

	$scope.changeScale = function (scaleIndex, scaleName) {
		$scope.currentScaleIndex = scaleIndex;
		$scope.currentScaleName = scaleName;
		GuitarService.changeScale($scope.keyRoot, scaleIndex);
		$scope.fretboard = GuitarService.getFretboard();
		$scope.showScaleDropdown = false;
	}

	$scope.changeFlatsSharps = function (flatNotation) {
		$scope.flatNotation = flatNotation;
		GuitarService.changeTuning($scope.strings,$scope.flatNotation);
		$scope.fretboard = GuitarService.getFretboard();
	}

	$scope.changeTuning = function (newNote) {
		newNote = trimNoteName(newNote);
		$scope.strings[currentString] = newNote;
		GuitarService.changeTuning($scope.strings,$scope.flatNotation);
		$scope.fretboard = GuitarService.getFretboard();
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