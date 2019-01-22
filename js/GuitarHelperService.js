/**
 * Module description
 * @class GuitarService
 */
app.service('GuitarHelperService', function() {

	/**
	 * [FLAT_NOTES description]
	 * @type {Array}
	 */
	var FLAT_NOTES = ["Ab","A","Bb","B","C","Db","D","Eb","E","F","Gb","G"];

	/**
	 * [SHARP_NOTES description]
	 * @type {Array}
	 */
	var SHARP_NOTES = ["G#","A","A#","B","C","C#","D","D#","E","F","F#","G"];

	/**
	 * [NUM_FRETS description]
	 * @type {Number}
	 */
	var NUM_FRETS = 12;

	/**
	 * [NUM_STRINGS description]
	 * @type {Number}
	 */
	var NUM_STRINGS = 6;

	/**
	 * [NOTES description]
	 * @type {Array}
	 */
	var NOTES = ["G#/Ab","A","A#/Bb","B","C","C#/Db","D","D#/Eb","E","F","F#/Gb","G"]; 

	/**
	 * [DEFAULT_SETTINGS description]
	 * @type {Object}
	 */
	var DEFAULT_SETTINGS = {
		currentTuning: [
			8,	// E
			3,	// B
			11, // G
			6,  // D
			1,  // A
			8,  // E
		],
		currentScale: 0, // Major Scale
		currentStartNote: 4, // C
		flatNotation: false
	};

	/**
	 * [SCALES description]
	 * @type {Array}
	 */
	var SCALES = [
		{name: "Major scale", notes: [0, 2, 4, 5, 7, 9, 11]},
		{name: "Mixolydian mode" , notes: [0, 2, 4, 5, 7, 9, 10]},
		{name: "Lydian mode", notes: [0, 2, 4, 6, 7, 9, 11] },
		{name: "Lydian dominant mode", notes: [0, 2, 4, 6, 7, 9, 10]},
		{name: "Phrygian dominant mode", notes: [0, 2, 4, 5, 7, 8, 11]},
		{name: "Harmonic major scale", notes: [0, 2, 4, 5, 7, 8, 11]},
		{name: "Natural minor scale", notes: [0, 2, 3, 5, 7, 8, 10]},
		{name: "Dorian mode", notes: [0, 2, 3, 5, 7, 9, 10]},
		{name: "Harmonic minor scale", notes: [0, 2, 3, 5, 7, 8, 11]},
		{name: "Melodic minor scale", notes: [0, 2, 3, 5, 7, 9, 11]},
		{name: "Phrygian mode", notes: [0, 1, 3, 5, 7, 8, 10]},
		{name: "Locrian mode", notes: [0, 1, 3, 5, 6, 8, 10]},
		{name: "Blues scale", notes: [0, 3, 5, 6, 7, 10]},
		{name: "Altered scale", notes: [0, 1, 3, 4, 6, 8, 10]},
		{name: "Major pentatonic scale", notes: [0, 2, 4, 7, 9]},
		{name: "Minor pentatonic scale", notes: [0, 3, 5, 7, 10]},
		{name: "Chromatic Scale", notes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]},
		{name: "Whole tone scale", notes: [0, 2, 4, 6, 8, 10]},
		{name: "Octatonic scale", notes: [0, 2, 3, 5, 6, 8, 9, 11]},
		{name: "Hexatonic scale", notes: [0, 3, 4, 7, 8, 11]}
	];

	/**
	 * [getNotesInScale description]
	 * @param  {[type]} startNote  [description]
	 * @param  {[type]} scaleIndex [description]
	 * @return {[type]}            [description]
	 */
	var getNotesInScale = function (startNote, scaleIndex) {
		// Get scale notes from index
		var scale = SCALES[scaleIndex].notes;

		// Return array that will hold indices of all the notes in the scale
		var notesInScale = [];

		// Loop through the scale array (starting on the root) and add to return array
		for (var i = 0; i < scale.length; i++) {
			notesInScale.push((startNote + scale[i]) % 12);
		}

		return notesInScale;
	}

	/**
	 * [buildString description]
	 * @param  {[type]} openNote       [description]
	 * @param  {[type]} notesInScale [description]
	 * @param  {[type]} flatNotation   [description]
	 * @return {[type]}                [description]
	 */
	var buildString = function (openNote, notesInScale, flatNotation) {
		/**
		 * Boolean that denotes whether the string's open note is in the current scale
		 * @type {boolean}
		 */
		var openNoteIsInScale = notesInScale.includes(openNote);

		/**
		 * Boolean that denotes whether the string's open note is the root note of the scale
		 * @type {boolean}
		 */
		var openNoteIsRoot = (notesInScale[0] == openNote);

		/**
		 * Array of Fret JSON object that contain the following keys:
		 * note: string that shows the name of the note
		 * isInScale: boolean that denotes whether the note is in the scale
		 * isRoot: boolean that denotes whether the note is the root of the scale
		 * @type {Array}
		 */
		var frets = [];

		var currentNote = openNote;

		// Iterate through the frets, starting on the first one
		for (j=0;j<NUM_FRETS;j++) {
			currentNote = (currentNote + 1) % 12;
			var isInScale = false;
			var isRoot = false;

			// Check if note is in the scale
			if(notesInScale.indexOf(currentNote) != -1)
			{
				isInScale = true;

				// Check if note is root note
				if(notesInScale.indexOf(currentNote) == 0) {
					isRoot = true;
				}
			}

			var note = flatNotation ? FLAT_NOTES[currentNote] : SHARP_NOTES[currentNote];
			var fret = {note: note, isInScale: isInScale, isRoot: isRoot};
			frets.push(fret);
		}

		var string = { 
			openNoteIsInScale: openNoteIsInScale,
			openNoteIsRoot: openNoteIsRoot,
			frets: frets
		};

		return string;
	}

	/**
	 * [getFretboard description]
	 * @param  {[type]} settings [description]
	 * @return {[type]}          [description]
	 */
	var getFretboard = function (settings) {
		var currentTuning = settings.currentTuning;
		var flatNotation = settings.flatNotation;
		var notesInScale = getNotesInScale(settings.currentStartNote, settings.currentScale);

		var strings = [];

		for (i=0;i<NUM_STRINGS;i++) {
			strings.push(buildString(currentTuning[i],notesInScale,flatNotation));
		}

		var fretboard = {strings: strings};

		return fretboard;
	}

	this.NOTES = NOTES;
	this.SCALES = SCALES;
	this.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
	
	this.getFretboard = getFretboard;
});