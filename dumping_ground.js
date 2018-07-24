// From guesthouse_functions.js

/**
 * createFakeShortName
 * Returns a very short fake name, e.g. "Joe A"
 * @return {string} The fake name string
*/
function createFakeShortName(){
  // A bunch of example first names (all short)
  let rating_first_names = [ "Joe",	"Sue", "Tom",	"Ann", "Raz",	"Ghi",	"Kim",	"Sam",	"Al",	"Max",	"Eve",	"Lee",	"Jon",	"Mo",	"Liz",	"Rik",	"Tam" ];
	// The first name is selected randomly from the first names array
  firstName = rating_first_names[ Math.floor( rating_first_names.length * Math.random() )];
  // The last name is just a single letter (e.g. "A")
	lastName = String.fromCharCode(65 + (26 * Math.random()) );
	return firstName + ' ' + lastName;
}

// From idleMiner.js
/**
 * formattedTime
 * Returns a formatted time in the format "1.2 years".
 * @param {number}   time          The time to format in (seconds)
 * @return {string} The formatted time string
*/
function formattedTime(time){
  // The strings appended to the formatted time string
  let timeSuffixes = [ "secs", "mins", "hours", "days", "years", "millenia" ];
  // The number of seconds where each new suffix is used
  let timeDivides = [    59,   3599,   86399,  31535999, 31535999999, 9e99 ];
  // Loop through the time divides array  
	for (var i = 0; i < timeDivides.length; i++){
    // If the time number is greater than the current time divide (59 to begin)
		if (time < timeDivides[i]){
      // If using the first divide (seconds, 59) then divide by 1, else divide by the value + 1 (e.g. minutes, 60)
			if (i === 0){ divider = 1; } else { divider = (timeDivides[i-1] + 1); }
      // The formatted string is reduced to 1 decimal place and the suffix string is added
      timeStr = (time / divider ).toFixed(1) + ' ' + timeSuffixes[i];
			return timeStr;
		}
	}
}


/**
 * duplicateElements
 * Duplicates elements in an array
 * @param {array}   origArray      The original array of elements
 * @param {number}  times          The number of times to duplicate each element
 * @return {array} The new array of elements with each element duplicated
*/
function duplicateElements(origArray, times) { 
	return origArray.reduce((value, element) => { return value.concat(Array(times).fill(element)); }, []); 
}

/**
 * bigMoneyForm
 * Returns a formatted cash value using exponents and abbreviated suffixes (e.g. Mi, Bi, Tr)
 * @requires duplicateElements -> turns [a, b, c] (2 times) into [a, a, b, b, c, c]
 * @param {number}   value          The cash value
 * @return {string} The formatted cash string (e.g. 6.34 Qu)
*/
function bigMoneyForm(value){
  // The array of abbreviated suffixes
	let largeList = [ "","K","M","B","T","Qu","Qi","Sx","Sp","Oc","No","De","UD","DD","TD","qD","QD","sD","SD","OD","ND" ];
  // The array of large number suffixes gets duplicated (to ["","","","K","K","K",...] )
  let largeNumbers = duplicateElements(largeList, 3);
  // 	Turn the value into exponent form (6.345e21)
	var exp = value.toExponential(3);
  // The prefix to be added to the front of the returned string (e.g. "$","£")
	var prefix = ""; //"£";
  // Turn the exponent number into a string
	var strExp = String (exp);
  // Find the "e" within the string value
	var findE = strExp.indexOf('e');
  // Find the sign (positive/negative)
	var sign = strExp.substr(findE + 1, 1);
  // The coefficient is the number before the "e"
	var coefficient = strExp.substr(0, findE - 1);
  // The exponent is the number after the "e" (with its sign)
	var exponent = Number(sign + strExp.substr(findE + 2, 2) );	
	// The maximum possible exponent (currently e+60)
	var maxExp = largeNumbers.length;
  // If the exponent is too big return false
	if (exponent >= maxExp){
		// Err - too big!
		return false;
  // Else if the exponent is below 3 then no suffix is needed
	}else if (exponent < 3){
		return Math.floor(value);
	}
	// The exponent is therefore within the range 3 - 60
  // Find the suffix from the large numbers array
	var suffix = largeNumbers[exponent];
  // The multiplier is the exponent mod 3, then + 1
	var multiplier = (exponent % 3) + 1;
  // The returned string value is the prefix string, then the formatted cash value, then the suffix string
	var newStr = prefix + (coefficient * Math.pow(10, multiplier - 1) ).toFixed(2) + suffix;
	return newStr;
	
}
