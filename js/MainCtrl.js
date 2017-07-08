app.controller("MainCtrl", ["$scope", "GuitarService", function($scope, GuitarService) {
	$scope.notes = ["G#/Ab","A","A#/Bb","B","C","C#/Db","D","D#/Eb","E","F","F#/Gb","G"];
	$scope.strings = ["E","A","D","G","B","E"];
	$scope.majorMinorState = "Major";
	$scope.majorMinorArray = ["Major","Minor"];
	$scope.isMinor = false;
	$scope.key = "C";
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
		$scope.toggleTuner();
	}

	$scope.highlightKey = function (root) {
		//If X#/Yb -> X#
		if (root.length > 1) {
			root = root.substring(0,2);
		}
		var isMinor = ($scope.majorMinorState == "Minor");
		
		$scope.fretboard = GuitarService.highlightKey(root, isMinor);
	}

	$scope.toggleTuner = function (selectedString) {
		currentString = selectedString;
		$scope.showTuner = !$scope.showTuner;
	}

	// $scope.toggleShowAllNotes = function () {
	// 	console.log("Show all notes");
	// }
}]);