app.service('GuitarService', function() {
	var currentTuning = ["E","B","G","D","A","E"];
	//We track the tuning backwards because with display the last string on top
	var fretboard = [];
	var currentKey = [];
	var notes = ["Ab","A","Bb","B","C","Db","D","Eb","E","F","Gb","G"];
	var numFrets = 12;
	var numStrings = 6;

	var getNoteIndex = function(noteName) {
		//This should really be done with a dictionary
		//If X#/Yb -> X#
		if (noteName.length > 1) {
			noteName = noteName.substring(0,2);
		}
		//TODO Make this better

		switch  (noteName) {
			case "G#":
			case "Ab":
				return 0;
			case "A":
				return 1;
			case "A#":
			case "Bb":
				return 2;
			case "B":
				return 3;
			case "C":
				return 4;
			case "C#":
			case "Db":
				return 5;
			case "D":
				return 6;
			case "D#":
			case "Eb":
				return 7;
			case "E":
				return 8;
			case "F":
				return 9;
			case "F#":
			case "Gb":
				return 10;
			case "G":
				return 11;
				break;
		}
	}

	var findRelativeMajor = function (root) {
		var rootIndex = getNoteIndex(root);
		var relativeMajorIndex = (rootIndex + 3) % 12;
		var relativeMajor = notes[relativeMajorIndex];

		return relativeMajor;
	}

	var buildString = function (tuning) {
		var noteIndex = getNoteIndex(tuning);
		var frets = [];

		for (j=0;j<numFrets;j++) {
			noteIndex = (noteIndex + 1) % 12;
			var highlight = false;
			if(currentKey.indexOf(noteIndex) != -1)
			{
				highlight = true;
			}
			var fret = {note: notes[noteIndex], highlight: highlight};
			frets.push(fret);
		}

		var string = {frets: frets};

		return string;
	}

	var buildFretboard = function (stringTunings) {
		var strings = [];
		var openInKey = [];

		for (i=0;i<numStrings;i++) {
			var isInKey = currentKey.includes(getNoteIndex(stringTunings[i]));

			openInKey.push(isInKey);
			strings.push(buildString(stringTunings[i]));
		}

		fretboard = {strings: strings, openInKey: openInKey};
	}

	var buildMajorKey = function (root) {
		var rootIndex = getNoteIndex(root);
		var notesInKey = [
			rootIndex,
			(rootIndex + 2) % 12,
			(rootIndex + 4) % 12,
			(rootIndex + 5) % 12,
			(rootIndex + 7) % 12,
			(rootIndex + 9) % 12,
			(rootIndex + 11) % 12
		];
		return notesInKey;
	}

	var changeStringTuning = function (stringIndex, newNote) {
		fretboard.strings[stringIndex] = buildString(newNote);
	}

	this.changeTuning = function (tuning) {
		var noteArray = tuning.slice().reverse();
		currentTuning = noteArray;
		for(i=0;i<noteArray.length;i++){
			changeStringTuning(i, noteArray[i]);
		}

		return fretboard;
	}

	this.highlightKey = function (root, isMinor) {
		if (isMinor) {
			root = findRelativeMajor(root)
		}
		currentKey = buildMajorKey(root);
		buildFretboard(currentTuning);

		return fretboard;
	}

	this.getFretboard = function () {
		return fretboard;
	}

	//Initialization Code
	//qqq Move to its own method, or look up common protocol
	buildFretboard(currentTuning);
	this.highlightKey("C");
	this.fretboard = fretboard;
});