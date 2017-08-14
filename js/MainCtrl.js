app.controller("MainCtrl", ["$scope", "GuitarService", function($scope, GuitarService) {
	$scope.notes = ["G#/Ab","A","A#/Bb","B","C","C#/Db","D","D#/Eb","E","F","F#/Gb","G"];
	$scope.strings = ["E","A","D","G","B","E"];
	$scope.isMinor = false;
	$scope.keyRoot = "C";
	$scope.fretboard = GuitarService.getFretboard();
	$scope.showTuner = false;
	$scope.showAllNotes = false;

	var currentString;

	$scope.changeTuning = function (newNote) {
		//If X#/Yb -> X#
		if (newNote.length > 1) {
			newNote = newNote.substring(0,2);
		}
		$scope.strings[currentString] = newNote;
		$scope.fretboard = GuitarService.changeTuning($scope.strings);
		$scope.changeKey();
		$scope.toggleTuner();
	}

	$scope.changeKey = function () {
		var keyRoot = $scope.keyRoot;
		var isMinor = $scope.isMinor;

		//If X#/Yb -> X#
		if (keyRoot.length > 1) {
			keyRoot = keyRoot.substring(0,2);
		}

		$scope.fretboard = GuitarService.highlightKey(keyRoot, isMinor);
	}

	$scope.changeMajorMinor = function (isMinor) {
		$scope.isMinor = isMinor;
		$scope.changeKey();
	}

	$scope.toggleTuner = function (selectedString) {
		currentString = selectedString;
		$scope.showTuner = !$scope.showTuner;
	}

	// $scope.toggleShowAllNotes = function () {
	// 	console.log("Show all notes");
	// }
}]);