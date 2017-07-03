app.controller("MainCtrl", ["$scope", "GuitarService", function($scope, GuitarService) {
	console.log('controller is live');
	$scope.notes = ["G#/Ab","A","A#/Bb","B","C","C#/Db","D","D#/Eb","E","F","F#/Gb","G"];
	$scope.strings = ["E","A","D","G","B","E"];
	$scope.majorMinorState = "Major";
	$scope.majorMinorArray = ["Major","Minor"];
	$scope.isMinor = false;
	$scope.key = "C";
	$scope.fretboard = GuitarService.getFretboard();

	$scope.changeTuning = function () {
		$scope.fretboard = GuitarService.changeTuning($scope.strings);
	}

	$scope.highlightKey = function (root) {
		//If X#/Yb -> X#
		if (root.length > 1) {
			root = root.substring(0,2);
		}
		var isMinor = ($scope.majorMinorState == "Minor");
		
		$scope.fretboard = GuitarService.highlightKey(root, isMinor);
	}

	$scope.showTuner = function () {
		console.log("works");
	}
}]);