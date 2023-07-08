// Typing Speed Test JS File
// Written By Patrick Gillespie
// http://patorjk.com/

// GLOBAL VARIABLES

// Create the console object if it doesn't exist (like in IE)
try { console.assert(1); } catch(e) { console = { log: function() {}, assert: function() {} } }

var LoadingPanel = null;
var CurrentWord = "";
var WordsToType = new Array();
var WordsThatAreCorrect = new Array();
var TypedKeys = new Array();
var TypedKeysTime = new Array();
var WhatUserTyped = new Array();
var AverageTypedKeySpeed = null;
var NumTimesKeyPressed = [];
var WordAt = -1;
var IsClockStarted = false;
var WordsCorrect = 0;
var WordsIncorrect = 0;
var TimeCountSeconds = -1;
var TimesUp = false;
var ClockTimeoutID = 0;
var TypingTestHeight = 0;
var TimeBase = new Date();

var InputTextFunctMap = new Array();
InputTextFunctMap['english_common_words'] = "englishCommonWords();";
InputTextFunctMap['english_sat_words'] = "englishSatWords();";
InputTextFunctMap['book_alice_in_wonderland_1'] = "aliceInWonderland(0);";
InputTextFunctMap['book_alice_in_wonderland_2'] = "aliceInWonderland(1);";
InputTextFunctMap['book_alice_in_wonderland_3'] = "aliceInWonderland(2);";
InputTextFunctMap['moby_dick_1'] = "mobyDick(0);";
InputTextFunctMap['twenty_thousand_1'] = "twentyThousandLeaguesUnderTheSea(0);";
InputTextFunctMap['david_copperfield_1'] = "davidCopperfield(0);";
InputTextFunctMap['treasure_island_1'] = "treasureIsland(0);";
InputTextFunctMap['the_time_machine_1'] = "theTimeMachine(0);";

var InputTextRandomizedMap = new Array();
InputTextRandomizedMap['english_common_words'] = true;
InputTextRandomizedMap['english_sat_words'] = true;
InputTextRandomizedMap['book_alice_in_wonderland_1'] = false;
InputTextRandomizedMap['book_alice_in_wonderland_2'] = false;
InputTextRandomizedMap['book_alice_in_wonderland_3'] = false;
InputTextRandomizedMap['moby_dick_1'] = false;
InputTextRandomizedMap['twenty_thousand_1'] = false;
InputTextRandomizedMap['david_copperfield_1'] = false;
InputTextRandomizedMap['treasure_island_1'] = false;
InputTextRandomizedMap['the_time_machine_1'] = false;

var InputTextLengthMap = new Array();
InputTextLengthMap['seconds_5'] = 125;
InputTextLengthMap['seconds_30'] = 125;
InputTextLengthMap['seconds_60'] = 250;
InputTextLengthMap['seconds_120'] = 500;
InputTextLengthMap['seconds_180'] = 750;
InputTextLengthMap['seconds_240'] = 1000;
InputTextLengthMap['seconds_300'] = 1250;
InputTextLengthMap['words_10'] = 10;
InputTextLengthMap['words_100'] = 100;
InputTextLengthMap['words_200'] = 200;
InputTextLengthMap['words_300'] = 300;
InputTextLengthMap['words_400'] = 400;
InputTextLengthMap['words_500'] = 500;
InputTextLengthMap['words_1000'] = 1000;
//InputTextLengthMap['words_all'] = 100000;

var TimerAmountMap = new Array();
TimerAmountMap['seconds_5'] = 5;
TimerAmountMap['seconds_30'] = 30;
TimerAmountMap['seconds_60'] = 60;
TimerAmountMap['seconds_120'] = 120;
TimerAmountMap['seconds_180'] = 180;
TimerAmountMap['seconds_240'] = 240;
TimerAmountMap['seconds_300'] = 300;
TimerAmountMap['words_10'] = 0;
TimerAmountMap['words_100'] = 0;
TimerAmountMap['words_200'] = 0;
TimerAmountMap['words_300'] = 0;
TimerAmountMap['words_400'] = 0;
TimerAmountMap['words_500'] = 0;
TimerAmountMap['words_1000'] = 0;
//TimerAmountMap['words_all'] = 0;

var TimerAmountStringMap = new Array();
TimerAmountStringMap['seconds_5'] = "5 Seconds";
TimerAmountStringMap['seconds_30'] = "30 Seconds";
TimerAmountStringMap['seconds_60'] = "60 Seconds";
TimerAmountStringMap['seconds_120'] = "120 Seconds";
TimerAmountStringMap['seconds_180'] = "180 Seconds";
TimerAmountStringMap['seconds_240'] = "240 Seconds";
TimerAmountStringMap['seconds_300'] = "300 Seconds";
TimerAmountStringMap['words_10'] = "10 Words";
TimerAmountStringMap['words_100'] = "100 Words";
TimerAmountStringMap['words_200'] = "200 Words";
TimerAmountStringMap['words_300'] = "300 Words";
TimerAmountStringMap['words_400'] = "400 Words";
TimerAmountStringMap['words_500'] = "500 Words";
TimerAmountStringMap['words_1000'] = "1000 Words";
//TimerAmountStringMap['words_all'] = "Tons Of Words";

var PossibleKeyboardLayouts = new Array();
PossibleKeyboardLayouts['qwerty'] = 0;
PossibleKeyboardLayouts['simplified_dvorak'] = 1;
PossibleKeyboardLayouts['left_dvorak'] = 2;
PossibleKeyboardLayouts['right_dvorak'] = 3;
PossibleKeyboardLayouts['colemak'] = 4;
PossibleKeyboardLayouts[0] = 'QWERTY';
PossibleKeyboardLayouts[1] = 'Simplified Dvorak';
PossibleKeyboardLayouts[2] = 'Left Handed Dvorak';
PossibleKeyboardLayouts[3] = 'Right Handed Dvorak';
PossibleKeyboardLayouts[4] = 'colemak';

var UsingKeyboardLayout = 0;

var KeyboardLayoutMap = new Array();

/*KeyboardLayoutMap[0] = new Array();
KeyboardLayoutMap[0][0] = "~`!1@2#3$4%5^6&7*8(9)0_-+=";
KeyboardLayoutMap[0][1] = "QqWwEeRrTtYyUuIiOoPp{[}]|\\";
KeyboardLayoutMap[0][2] = "AaSsDdFfGgHhJjKkLl:;\"'\n";
KeyboardLayoutMap[0][3] = "ZzXxCcVvBbNnMm<,>.?/";
KeyboardLayoutMap[0][4] = " ";*/

KeyboardLayoutMap[1]= new Array();
KeyboardLayoutMap[1][0] = "~`!1@2#3$4%5^6&7*8(9)0{[}]";
KeyboardLayoutMap[1][1] = "\"'<,>.PpYyFfGgCcRrLl?/+=|\\";
KeyboardLayoutMap[1][2] = "AaOoEeUuIiDdHhTtNnSs_-\n";
KeyboardLayoutMap[1][3] = ":;QqJjKkXxBbMmWwVvZz";
KeyboardLayoutMap[1][4] = " ";

KeyboardLayoutMap[2] = new Array();
KeyboardLayoutMap[2][0] = "~`{[}]?/PpFfMmLlJj$4#3@2!1";
KeyboardLayoutMap[2][1] = ":;QqBbYyUuRrSsOo>.^6%5+=|\\";
KeyboardLayoutMap[2][2] = "_-KkCcDdTtHhEeAaZz*8&7\n";
KeyboardLayoutMap[2][3] = "\"'XxGgVvWwNnIi<,)0(9";
KeyboardLayoutMap[2][4] = " ";

KeyboardLayoutMap[3] = new Array();
KeyboardLayoutMap[3][0] = "~`!1@2#3$4JjLlMmFfPp?/{[}]";
KeyboardLayoutMap[3][1] = "%5^6Qq>.OoRrSsUuYyBb:;+=|\\";
KeyboardLayoutMap[3][2] = "&7*8ZzAaEeHhTtDdCcKk_-\n";
KeyboardLayoutMap[3][3] = "(9)0Xx<,IiNnWwVvGg\"'";
KeyboardLayoutMap[3][4] = " ";

KeyboardLayoutMap[4] = new Array();
KeyboardLayoutMap[4][0] = "~`!1@2#3$4%5^6&7*8(9)0_-+=";
KeyboardLayoutMap[4][1] = "QqWwFfPpGgJjLlUuYy:;{[}]|\\";
KeyboardLayoutMap[4][2] = "AaRrSsTtDdHhNnEeIiOo\"'\n";
KeyboardLayoutMap[4][3] = "ZzXxCcVvBbKkMm<,>.?/";
KeyboardLayoutMap[4][4] = " ";

var KeyPositionOffset = new Array();
KeyPositionOffset[0] = 0;
KeyPositionOffset[1] = 1;
KeyPositionOffset[2] = 1;
KeyPositionOffset[3] = 1;
KeyPositionOffset[4] = 3;

var KeyboardRowLength = new Array()
KeyboardRowLength[0] = 13;
KeyboardRowLength[1] = 13;
KeyboardRowLength[2] = 12;
KeyboardRowLength[3] = 10;
KeyboardRowLength[4] = 1;

var ImageLayoutMap = new Array();
ImageLayoutMap[0] = new Array();
ImageLayoutMap[0][0] = ["0_0","0_1","0_2","0_3","0_4","0_5","0_6","0_7","0_8","0_9","0_10","0_11","0_12","0_13"];
ImageLayoutMap[0][1] = ["1_0","1_1","1_2","1_3","1_4","1_5","1_6","1_7","1_8","1_9","1_10","1_11","1_12","1_13"];
ImageLayoutMap[0][2] = ["2_0","2_1","2_2","2_3","2_4","2_5","2_6","2_7","2_8","2_9","2_10","2_11","2_12"];
ImageLayoutMap[0][3] = ["3_0","3_1","3_2","3_3","3_4","3_5","3_6","3_7","3_8","3_9","3_10","3_11"];
ImageLayoutMap[0][4] = ["4_0","4_1","4_2","4_3","4_4","4_5","4_6","4_7"];

ImageLayoutMap[1] = new Array();
ImageLayoutMap[1][0] = ["0_0","0_1","0_2","0_3","0_4","0_5","0_6","0_7","0_8","0_9","0_10","1_11","1_12","0_13"];
ImageLayoutMap[1][1] = ["1_0","2_11","3_8","3_9","1_10","1_6","2_4","2_5","3_3","1_4","2_9","3_10","0_12","1_13"];
ImageLayoutMap[1][2] = ["2_0","2_1","1_9","1_3","1_7","1_8","2_3","2_6","1_5","3_6","2_2","0_11","2_12"];
ImageLayoutMap[1][3] = ["3_0","2_10","1_1","2_7","2_8","3_2","3_5","3_7","1_2","3_4","3_1","3_11"];
ImageLayoutMap[1][4] = ["4_0","4_1","4_2","4_3","4_4","4_5","4_6"];

ImageLayoutMap[2] = new Array();
ImageLayoutMap[2][0] = ["0_0","1_11","1_12","3_10","1_10","2_4","3_7","2_9","2_7","0_4","0_3","0_2","0_1","0_13"];
ImageLayoutMap[2][1] = ["1_0","2_10","1_1","3_5","1_6","1_7","1_4","2_2","1_9","3_9","0_6","0_5","0_12","1_13"];
ImageLayoutMap[2][2] = ["2_0","0_11","2_8","3_3","2_3","1_5","2_6","1_3","2_1","3_1","0_8","0_7","2_12"];
ImageLayoutMap[2][3] = ["3_0","2_11","3_2","2_5","3_4","1_2","3_6","1_8","3_8","0_10","0_9","3_11"];
ImageLayoutMap[2][4] = ["4_0","4_1","4_2","4_3","4_4","4_5","4_6"];

ImageLayoutMap[3] = new Array();
ImageLayoutMap[3][0] = ["0_0","0_1","0_2","0_3","0_4","2_7","2_9","3_7","2_4","1_10","3_10","1_11","1_12","0_13"];
ImageLayoutMap[3][1] = ["1_0","0_5","0_6","1_1","3_9","1_9","1_4","2_2","1_7","1_6","3_5","2_10","0_12","1_13"];
ImageLayoutMap[3][2] = ["2_0","0_7","0_8","3_1","2_1","1_3","2_6","1_5","2_3","3_3","2_8","0_11","2_12"];
ImageLayoutMap[3][3] = ["3_0","0_9","0_10","3_2","3_8","1_8","3_6","1_2","3_4","2_5","2_11","3_11"];
ImageLayoutMap[3][4] = ["4_0","4_1","4_2","4_3","4_4","4_5","4_6"];

ImageLayoutMap[4] = new Array();
ImageLayoutMap[4][0] = ["0_0","0_1","0_2","0_3","0_4","0_5","0_6","0_7","0_8","0_9","0_10","0_11","0_12","0_13"];;
ImageLayoutMap[4][1] = ["1_0","1_1","1_2","2_4","1_10","2_5","2_7","2_9","1_7","1_6","2_10","1_11","1_12","1_13"];
ImageLayoutMap[4][2] = ["2_0","2_1","1_4","2_2","1_5","2_3","2_6","3_6","1_3","1_8","1_9","2_11","2_12"];
ImageLayoutMap[4][3] = ["3_0","3_1","3_2","3_3","3_4","3_5","2_8","3_7","3_8","3_9","3_10","3_11"];
ImageLayoutMap[4][4] = ["4_0","4_1","4_2","4_3","4_4","4_5","4_6"];


/* 
  This array indicates a mapping of fingers to keys
  0 = thumb
  1 = left pinky
  2 = left ring finger
  3 = left middle finger
  4 = left index finger
  5 = right index finger
  6 = right middle finger 
  7 = right ring finger
  8 = right pinky
*/
var FingerToKeys = new Array();
FingerToKeys[0] = new Array();
FingerToKeys[0][0] = 1;
FingerToKeys[0][1] = 1;
FingerToKeys[0][2] = 2;
FingerToKeys[0][3] = 3;
FingerToKeys[0][4] = 4;
FingerToKeys[0][5] = 4;
FingerToKeys[0][6] = 5;
FingerToKeys[0][7] = 5;
FingerToKeys[0][8] = 6;
FingerToKeys[0][9] = 7;
FingerToKeys[0][10] = 8;
FingerToKeys[0][11] = 8;
FingerToKeys[0][12] = 8;
FingerToKeys[0][13] = 8;
FingerToKeys[1] = new Array();
FingerToKeys[1][0] = 1;
FingerToKeys[1][1] = 1;
FingerToKeys[1][2] = 2;
FingerToKeys[1][3] = 3;
FingerToKeys[1][4] = 4;
FingerToKeys[1][5] = 4;
FingerToKeys[1][6] = 5;
FingerToKeys[1][7] = 5;
FingerToKeys[1][8] = 6;
FingerToKeys[1][9] = 7;
FingerToKeys[1][10] = 8;
FingerToKeys[1][11] = 8;
FingerToKeys[1][12] = 8;
FingerToKeys[1][13] = 8;
FingerToKeys[2] = new Array();
FingerToKeys[2][0] = 1;
FingerToKeys[2][1] = 1;
FingerToKeys[2][2] = 2;
FingerToKeys[2][3] = 3;
FingerToKeys[2][4] = 4;
FingerToKeys[2][5] = 4;
FingerToKeys[2][6] = 5;
FingerToKeys[2][7] = 5;
FingerToKeys[2][8] = 6;
FingerToKeys[2][9] = 7;
FingerToKeys[2][10] = 8;
FingerToKeys[2][11] = 8;
FingerToKeys[2][12] = 8;
FingerToKeys[3] = new Array();
FingerToKeys[3][0] = 1;
FingerToKeys[3][1] = 1;
FingerToKeys[3][2] = 2;
FingerToKeys[3][3] = 3;
FingerToKeys[3][4] = 4;
FingerToKeys[3][5] = 4;
FingerToKeys[3][6] = 5;
FingerToKeys[3][7] = 5;
FingerToKeys[3][8] = 6;
FingerToKeys[3][9] = 7;
FingerToKeys[3][10] = 8;
FingerToKeys[3][11] = 8;
FingerToKeys[4] = new Array();
FingerToKeys[4][0] = 4;
FingerToKeys[4][1] = 4;
FingerToKeys[4][2] = 4;
FingerToKeys[4][3] = 0;
FingerToKeys[4][4] = 5;
FingerToKeys[4][5] = 5;
FingerToKeys[4][6] = 5;
FingerToKeys[4][7] = 5;

var FingerUsage = new Array();
FingerUsage[0] = 0;
FingerUsage[1] = 0;
FingerUsage[2] = 0;
FingerUsage[3] = 0;
FingerUsage[4] = 0;
FingerUsage[5] = 0;
FingerUsage[6] = 0;
FingerUsage[7] = 0;
FingerUsage[8] = 0;

var FingerMap = new Array();
FingerMap[0] = "Thumb(s) (¹ÔéÇâ»é§)";
FingerMap[1] = "Left Pinky (¹ÔéÇ¡éÍÂ«éÒÂ)";
FingerMap[2] = "Left Ring (¹ÔéÇ¹Ò§«éÒÂ)";
FingerMap[3] = "Left Middle (¹ÔéÇ¡ÅÒ§«éÒÂ)";
FingerMap[4] = "Left Index (¹ÔéÇªÕé«éÒÂ)";
FingerMap[5] = "Right Index (¹ÔéÇªÕé¢ÇÒ)";
FingerMap[6] = "Right Middle (¹ÔéÇ¡ÅÒ§¢ÇÒ)";
FingerMap[7] = "Right Ring (¹ÔéÇ¹Ò§¢ÇÒ)";
FingerMap[8] = "Right Pinky (¹ÔéÇ¡éÍÂ¢ÇÒ)";
FingerMap[9] = "N/A";

var FingerColor = new Array();
FingerColor[0] = new Array();
FingerColor[0][0] = 255;
FingerColor[0][1] = 255;
FingerColor[0][2] = 255;

FingerColor[1] = new Array();
FingerColor[1][0] = 0;
FingerColor[1][1] = 255;
FingerColor[1][2] = 255;

FingerColor[2] = new Array();
FingerColor[2][0] = 0;
FingerColor[2][1] = 0;
FingerColor[2][2] = 255;

FingerColor[3] = new Array();
FingerColor[3][0] = 168;
FingerColor[3][1] = 48;
FingerColor[3][2] = 255;

FingerColor[4] = new Array();
FingerColor[4][0] = 255;
FingerColor[4][1] = 0;
FingerColor[4][2] = 255;
FingerColor[5] = new Array();
FingerColor[5][0] = 255;
FingerColor[5][1] = 0;
FingerColor[5][2] = 0;
FingerColor[6] = new Array();
FingerColor[6][0] = 255;
FingerColor[6][1] = 136;
FingerColor[6][2] = 0;
FingerColor[7] = new Array();
FingerColor[7][0] = 255;
FingerColor[7][1] = 255;
FingerColor[7][2] = 0;
FingerColor[8] = new Array();
FingerColor[8][0] = 0;
FingerColor[8][1] = 255;
FingerColor[8][2] = 0;

var LetterCasing = "mixed";

var LoadedInputTextFunctions = [];

var NumberOfWordsForDisplayBox = 1250;

var MaxOffsetTop = null;
var InputTextLineHeight = 22;

function configUpdateLanguage()
{ 
}

function displayHotSpotStats(row, col)
{
  var keyFound = false;
  var adjustedCol = (col - KeyPositionOffset[row]) * 2;

  // figure out what characters are associated with this row and column
  var pressedKeys = [];  
  
  if (row == 0 && col == 13)
  {
    pressedKeys[0] = " "; // PLACE HOLDER
  } else {
    if (adjustedCol >= 0 && adjustedCol < KeyboardLayoutMap[UsingKeyboardLayout][row].length)
    {
      pressedKeys[0] = KeyboardLayoutMap[UsingKeyboardLayout][row].substr(adjustedCol,1);
      if ( (adjustedCol+1) < KeyboardLayoutMap[UsingKeyboardLayout][row].length ) 
      {
         pressedKeys[1] = KeyboardLayoutMap[UsingKeyboardLayout][row].substr(adjustedCol+1,1);
      }
    }
  }
  
  // find the average time it took to press this key and how many times it was pressed
  var numberOfTimesPressed = 0;
  var numberOfTimesPressedStr = "";
  var averageSpeed = 0;
  var averageSpeedStr = "N/A";
  for (var i = 0; i < pressedKeys.length; i++)
  {
    var curCharCode = null;
    if (row == 0 && col == 13)
    {
      curCharCode = 8;
    } else {
      curCharCode = pressedKeys[i].charCodeAt(0);
    }
    
	//console.log("pressedKeys[i] = " + pressedKeys[i]);
	
    if ( AverageTypedKeySpeed[ curCharCode ] != undefined ) 
    {
      averageSpeed += (AverageTypedKeySpeed[ curCharCode ] * NumTimesKeyPressed[ curCharCode ]);
      numberOfTimesPressed += NumTimesKeyPressed[ curCharCode ];
    }
  }

  if (numberOfTimesPressed != 0)
  {
    averageSpeed = Math.round(averageSpeed/numberOfTimesPressed);
  }
  
  if (averageSpeed != 0)
  {
    averageSpeedStr = averageSpeed + " Milliseconds"
  }
  
  numberOfTimesPressedStr = numberOfTimesPressed + " Times"
  
  var keyLabel = pressedKeys.reverse().join(" ");
  
  // alter the label for certain keys
  if (row == 0 && col == 13) {
    keyLabel = "[BACKSPACE]"
  } else if (row == 1 && col == 0) {
    keyLabel = "[TAB]"
  } else if (row == 2 && col == 0) {
    keyLabel = "[CAPS LOCK]"
  } else if (row == 2 && col == 12) {
    keyLabel = "[ENTER]"
  } else if (row == 3 && col == 0) {
    keyLabel = "[LEFT SHIFT]"
  } else if (row == 3 && col == 11) {
    keyLabel = "[RIGHT SHIFT]"
  } else if (row == 4 && col == 0) {
    keyLabel = "[LEFT CTRL]"
  } else if (row == 4 && col == 1) {
    keyLabel = "[LEFT WIN KEY]"
  } else if (row == 4 && col == 2) {
    keyLabel = "[LEFT ALT]"
  } else if (row == 4 && col == 3) {
    keyLabel = "[SPACE]"
  } else if (row == 4 && col == 4) {
    keyLabel = "[RIGHT ALT]"
  } else if (row == 4 && col == 5) {
    keyLabel = "[RIGHT WIN KEY]"
  } else if (row == 4 && col == 6) {
    keyLabel = "[MENU]"
  } else if (row == 4 && col == 7) {
    keyLabel = "[RIGHT CTRL]"
  }
  
  document.getElementById("hot_key_statsKeyPressed").innerHTML = "<strong>{</strong>" + keyLabel + "<strong>}</strong>";
  document.getElementById("hot_key_statsTimesPressed").innerHTML = numberOfTimesPressedStr;
  document.getElementById("hot_key_statsAverageTime").innerHTML = averageSpeedStr;
  
  // highlight border
  
  // get width, minus 2 for border size
  var theWidth = document.getElementById("hot_key_" + row + "_" + col).offsetWidth - 2;
  theWidth = theWidth - 2;
  var theHeight = document.getElementById("hot_key_" + row + "_" + col).offsetHeight - 2;
  theHeight = theHeight - 2;
  document.getElementById("hot_key_" + row + "_" + col).style.width = theWidth + "px";
  document.getElementById("hot_key_" + row + "_" + col).style.height = theHeight + "px";

  document.getElementById("hot_key_" + row + "_" + col).style.borderWidth = "2px";
  document.getElementById("hot_key_" + row + "_" + col).style.backgroundPosition = "-1px -1px";
}

function hotSpotMouseOut(row, col)
{
  // minus 4 for border size
  var theWidth = document.getElementById("hot_key_" + row + "_" + col).offsetWidth-4;
  theWidth = theWidth + 2;
  var theHeight = document.getElementById("hot_key_" + row + "_" + col).offsetHeight-4;
  theHeight = theHeight + 2;
  document.getElementById("hot_key_" + row + "_" + col).style.width = theWidth + "px";
  document.getElementById("hot_key_" + row + "_" + col).style.height = theHeight + "px";
  
  document.getElementById("hot_key_" + row + "_" + col).style.borderWidth = "1px";
  document.getElementById("hot_key_" + row + "_" + col).style.backgroundPosition = "0px 0px"; 
}

function colorInitialKeyboards()
{
  for (var row = 0; row < FingerToKeys.length; row++)
  {
    for (var col = 0; col < FingerToKeys[row].length; col++)
    {
      // get finger index
      var fingerIndex = FingerToKeys[row][col];
  
      // update div color for key selection keyboard
      document.getElementById("key_" + row + "_" + col).style.backgroundColor = "rgb(" + FingerColor[fingerIndex][0] + "," + FingerColor[fingerIndex][1] + "," + FingerColor[fingerIndex][2] + ")";
      
      // update div color for hot spot keyboard
      document.getElementById("hot_key_" + row + "_" + col).style.backgroundColor = "rgb(255,255,255)";
    }
  } 
  
  // gray out keys that can't be updated
  document.getElementById("key_4_0").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("key_4_1").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("key_4_2").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("key_4_4").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("key_4_5").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("key_4_6").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("key_4_7").style.backgroundColor = "rgb(136,136,136)";
  
  // gray out hot keys that can't be tracked
  document.getElementById("hot_key_1_0").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("hot_key_2_0").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("hot_key_3_0").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("hot_key_3_11").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("hot_key_4_0").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("hot_key_4_1").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("hot_key_4_2").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("hot_key_4_4").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("hot_key_4_5").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("hot_key_4_6").style.backgroundColor = "rgb(136,136,136)";
  document.getElementById("hot_key_4_7").style.backgroundColor = "rgb(136,136,136)";
}

function updateFingerToKeyMap(row, col)
{
  var oldFingerIndex = FingerToKeys[row][col];  
  var fingerIndex = oldFingerIndex + 1;
  
  if (fingerIndex >= FingerUsage.length)
  {
    fingerIndex = 0; 
  }
  
  //alert(oldFingerIndex + "," + fingerIndex);
  
  // update key map
  FingerToKeys[row][col] = fingerIndex;
  
  // update div color
  //document.getElementById("key_" + row + "_" + col).style.backgroundColor = "rgb(" + FingerColor[fingerIndex][0] + "," + FingerColor[fingerIndex][1] + "," + FingerColor[fingerIndex][2] + ")";
  setTimeout(function() {fadeKeyToColor("key_" + row + "_" + col, FingerColor[oldFingerIndex], FingerColor[fingerIndex], 0, 7);}, 20);
}

function fadeKeyToColor(elementId, startColor, endColor, currentStep, stepCount)
{
  if (currentStep == stepCount)
  {
    document.getElementById(elementId).style.backgroundColor = "rgb(" + endColor[0] + "," + endColor[1] + "," + endColor[2] +")";
    return; 
  }
  
  var r = startColor[0] + Math.round(((endColor[0] - startColor[0]) / stepCount) * currentStep);
  var g = startColor[1] + Math.round(((endColor[1] - startColor[1]) / stepCount) * currentStep);
  var b = startColor[2] + Math.round(((endColor[2] - startColor[2]) / stepCount) * currentStep);
  
  document.getElementById(elementId).style.backgroundColor = "rgb(" + r + "," + g + "," + b +")";

  currentStep++;
  
  setTimeout(function() {fadeKeyToColor(elementId, startColor, endColor, currentStep, stepCount);}, 20);
}

function updateKeyboardLayout(newLayout)
{
  
  // FOR IE6 WE MUST USE GIF IMAGES INSTEAD OF PNG IMAGES
  var imageExt = ".png";
  var browser=navigator.appName;
  if (browser == "Microsoft Internet Explorer")
  {
    var IE6 = false /*@cc_on || @_jscript_version < 5.7 @*/;

    if (IE6 == true)
    {
      imageExt = ".gif";
    }
  }
  
  
  if ( newLayout == undefined )
  {
    newLayout = document.getElementById('lstKeyboardLayouts').options[document.getElementById('lstKeyboardLayouts').selectedIndex].value; 
  }

  UsingKeyboardLayout = PossibleKeyboardLayouts[newLayout];
  
  if (UsingKeyboardLayout <= 4)
  {
    for (var row = 0; row < ImageLayoutMap[UsingKeyboardLayout].length; row++)
    {
      for (var col = 0; col < ImageLayoutMap[UsingKeyboardLayout][row].length; col++)
      {
        var newBgImage = "url(Typing/images/keys/qwerty_600_" + ImageLayoutMap[UsingKeyboardLayout][row][col] + imageExt + ")";
        document.getElementById("key_" + row + "_" + col).style.backgroundImage = newBgImage;
        document.getElementById("guide_key_" + row + "_" + col).style.backgroundImage = newBgImage;
        document.getElementById("hot_key_" + row + "_" + col).style.backgroundImage = newBgImage;
      }
    }
  } 
  
  switch (newLayout){
    case "qwerty":

      break;
    case "simplified_dvorak":

      break;
    case "left_dvorak":

      break;
    case "right_dvorak":

      break;
    case "colemak":

      break;
    default : alert("Invalid input.");
  }
}

function updateLetterCasing(theType)
{
  if ( theType == undefined )
  {
    theType = document.getElementById('lstLetterCasing').options[document.getElementById('lstLetterCasing').selectedIndex].value; 
  }
  LetterCasing = theType;
  
  configResetTestSettings();
}

function getLetterCasing(isFormatted)
{
  var ret = LetterCasing;
  if (isFormatted == true)
  {
    if (LetterCasing == "lower")
    {
      ret = "Lower"; 
    }
    else
    {
      ret = "Mixed"; 
    }
  }
  
  return ret; 
}

function getWordList()
{
  var functName = document.getElementById("lstTestInput").value;
  
  //console.log("functName = " + functName);
  
  // if the function for generating this text isn't yet loaded, load it and return nothing
  
  if (LoadedInputTextFunctions[functName] == undefined)
  {
  	//console.log("Loading text...");
	//console.log("funcName..." + functName);
  	
    // load script
    
		//We have a .js file at assets/simple_get.js.  We will get
		//that script with the Get Utility:
		YAHOO.util.Get.script("typing/" + functName + ".js", {
		//YAHOO.util.Get.script("./scripts/input-text/" + functName + ".js", {
			
			//ALL OF THE CONFIGURATION OPTIONS BELOW ARE OPTIONAL;
			//IN MANY CASES, YOU'LL NEED ONLY TO DEFINE YOUR SUCCESS/
			//FAILURE HANDLERS.
			
			//callback to fire when the script is successfully loaded:
			onSuccess: function(obj) {
				//console.log("Success handler was called. Transaction ID: " + obj.tId);
				LoadedInputTextFunctions[functName] = true;
				configResetTestSettings();
			},
			
			//callback to fire if the script does not successfully load:
			onFailure: function(o) {
				//console.log("Failure handler was called. Transaction ID: " + obj.tId);
				alert("Application failed to load text for selected input. Please select another text input.");
			},
			
			//context under which success and failure handlers should run;
			//default is the current window, which we'll use for this example:
			scope: window,
			
			//by default, the script will be added to the current
			//window; use this property to override that default
			//(we're just using the default in this example):
			win: window,
			
			//will be passed as a member of the callback object to
			//the success or failure handler:
			data: {testData: "value"},
			
			//For Safari 2.x, which does not support the script's onload
			//event to determine when the script is loaded; instead, Get
			//will check for the presence of this varName (which is
			//defined in the script we're retrieving) and use its presence
			//to determine when the script has been successfully loaded:
			varName: ["YAHOO.simple_get.data"]
		});
		
		return "";
  }
  var words = eval(functName + "()");

  // cut the words down to size
  var wordMax = InputTextLengthMap[document.getElementById("lstTestTime").value];
  //for (var j = wordMax; j < words.length; j++)
  //{
  //  words[j] = "";
  //}
  
  words.splice(wordMax, words.length - wordMax);
  
  //words = trim(words);

  //var words = eval(InputTextFunctMap[functName]);
  
  if (LetterCasing == "lower")
  {
    for (var i = 0; i < words.length; i++)
    {
      words[i] = words[i].toLowerCase();
      words[i] = words[i].replace(/:/g, ";");
      words[i] = words[i].replace(/\"/g, "'");
      words[i] = words[i].replace(/\(/g, "[");
      words[i] = words[i].replace(/\)/g, "]");
    }
  }
  return words;
}

function calculateCpm()
{
  var totalTextLen = 0;
  
  for (i = 0; i < WordAt && i < WordsToType.length; i++)
  {
    if (WordsThatAreCorrect[i] != null)
    {
      // plus 1 to account for the space character that was typed
      totalTextLen += (WordsToType[i] + "").length + 1; 
    }
  }
  
  if (TimerAmountMap[document.getElementById("lstTestTime").value] != 0)
  {
    ret = Math.round((totalTextLen) * ( 60 / TimerAmountMap[document.getElementById("lstTestTime").value] ));
  } 
  else
  {
    ret = Math.round(totalTextLen * (60/TimeCountSeconds));
  }
  
  return ret;
}

function colorHotSpotVisualization()
{
  var timeArray = getSlowestAndFastestKeyTypingTime();
  var slowestTime = timeArray[0];
  var fastestTime = timeArray[1];

  //console.log("colorHotSpotVisualization - slowestTime = " + slowestTime);
  //console.log("colorHotSpotVisualization - fastestTime = " + fastestTime);

  for (var row = 0; row < KeyboardLayoutMap[UsingKeyboardLayout].length; row++)
  {
    for (var col = 0; col < KeyboardLayoutMap[UsingKeyboardLayout][row].length; col+=2)
    {
	
	  //console.log("row -> " + row + " col -> " + col);
	  
      var curCharCode = KeyboardLayoutMap[UsingKeyboardLayout][row].charCodeAt(col);
	    
      var realCol = Math.floor( col / 2 ) + KeyPositionOffset[row];

      var speedVal = getAverageSpeedForKey(row, col);

      if ( speedVal == 0 || slowestTime == 0) 
      {
        document.getElementById("hot_key_" + row + "_" + realCol).style.backgroundColor = "rgb(255,255,255)";
        continue;
      }
      
      var blueVal = Math.round(((speedVal-fastestTime) / (slowestTime-fastestTime)) * 255);
      
      var redVal = 255 - blueVal;
      
      document.getElementById("hot_key_" + row + "_" + realCol).style.backgroundColor = "rgb(" + redVal + "," + 0 + "," + blueVal + ")";
      
      //console.log("colorHotSpotVisualization - hot_key_" + row + "_" + realCol + " = " + speedVal);
    } 
  } 
  
  // update backspace key color
  curCharCode = 8;
  row = 0;
  realCol = 13;
  if ( AverageTypedKeySpeed[ curCharCode ] != undefined) 
  {
    speedVal = getAverageSpeedForKey(0, 13);
    if (speedVal != 0 && slowestTime != 0)
    {
      blueVal = Math.round(((speedVal-fastestTime) / (slowestTime-fastestTime)) * 255);    
      redVal = 255 - blueVal;
      document.getElementById("hot_key_0_13").style.backgroundColor = "rgb(" + redVal + "," + 0 + "," + blueVal + ")";
      //console.log("colorHotSpotVisualization - hot_key_0_13 = " + speedVal);
    } else {
      document.getElementById("hot_key_0_13").style.backgroundColor = "rgb(255,255,255)"; 
    }
  } else {
      document.getElementById("hot_key_0_13").style.backgroundColor = "rgb(255,255,255)";  
  }
}

function getFastestFinger()
{
  var index = 9;
  for (var i = 1; i < FingerUsage.length; i++)
  {
    
    if ( (FingerUsage[index] > FingerUsage[i] || index == 9) && FingerUsage[i] != 0)
    {
      index = i 
    }
  }
  return index;
}

function getSlowestFinger()
{
  var index = 0;
  var outputStr = "";
  
  for (var i = 1; i < FingerUsage.length; i++)
  {
    outputStr += "FingerUsage[" + i + "] = " + FingerUsage[i] + "\n";
    
    if (FingerUsage[index] < FingerUsage[i] )
    {
      index = i 
    }
  }
  
  return index;
}

function getAverageSpeedForKey(row, col)
{
  var speedVal = 0;
  var timesPressed = 0;
  var curCharCode = 0;
  
  if (row == 0 && col == 13)
  {
    curCharCode = 8;
  } else {
    curCharCode = KeyboardLayoutMap[UsingKeyboardLayout][row].charCodeAt(col);
  }
  
  //console.log("curCharCode = " + curCharCode + " AverageTypedKeySpeed[ curCharCode ] " + AverageTypedKeySpeed[ curCharCode ] + " length = " + AverageTypedKeySpeed.length);
  
  if ( AverageTypedKeySpeed[ curCharCode ] != undefined )
  {
    speedVal += AverageTypedKeySpeed[ curCharCode ] * NumTimesKeyPressed[ curCharCode ];
    timesPressed += NumTimesKeyPressed[ curCharCode ];
  }

  // Add in value of lower case version of the character
  if ((col + 1) < KeyboardLayoutMap[UsingKeyboardLayout][row].length)
  {
    curCharCode = KeyboardLayoutMap[UsingKeyboardLayout][row].charCodeAt(col+1);
    if ( AverageTypedKeySpeed[ curCharCode ] != undefined )
    {
      speedVal += AverageTypedKeySpeed[ curCharCode ] * NumTimesKeyPressed[ curCharCode ];
      timesPressed += NumTimesKeyPressed[ curCharCode ];
    }
  }
  
  if (timesPressed != 0)
  {
    speedVal = Math.round(speedVal/timesPressed);
  }
  
  return speedVal;
}

function getSlowestAndFastestKeyTypingTime()
{
  var slowestTime = 0;
  var slowestKey = "";
  var fastestTime = 1000000;
  var fastestKey = "";
  var returnArray = [];
  
  for (var row = 0; row < KeyboardLayoutMap[UsingKeyboardLayout].length; row++)
  {
    for (var col = 0; col < KeyboardLayoutMap[UsingKeyboardLayout][row].length; col+=2)
    {
      var speedVal = getAverageSpeedForKey(row, col);

      if ( speedVal > slowestTime) 
      {
        slowestTime = speedVal;
        slowestKey = row + "_" + col;
      }
      if ( speedVal != 0 && speedVal < fastestTime) 
      {
        fastestTime = speedVal;
        fastestKey = row + "_" + col;
      }
    } 
  } 
  
  // check backspace character
  curCharCode = 8
  if ( AverageTypedKeySpeed[ curCharCode ] != undefined && AverageTypedKeySpeed[ curCharCode ] > slowestTime) 
  {
    slowestTime = AverageTypedKeySpeed[ curCharCode ];
    slowestKey = "0_13";
  }
  if ( AverageTypedKeySpeed[ curCharCode ] != undefined && AverageTypedKeySpeed[ curCharCode ] != 0 && AverageTypedKeySpeed[ curCharCode ] < fastestTime) 
  {
    fastestTime = AverageTypedKeySpeed[ curCharCode ];
    fastestKey = "0_13";
  }
  
  returnArray[0] = Math.round(slowestTime);
  returnArray[1] = Math.round(fastestTime);
  
  //console.log("getSlowestAndFastestKeyTypingTime - slowestKey = " + slowestKey);
  //console.log("getSlowestAndFastestKeyTypingTime - fastestKey = " + fastestKey);
  
  return returnArray;
}

function calculateFingerSpeeds()
{
  var numTimeFingerUsed = [];
  FingerUsage = [];
  for (var i = 0; i <= 8; i++)
  {
    FingerUsage[i] = 0;
    numTimeFingerUsed[i] = 0;
  }
  
  console.log("UsingKeyboardLayout = " + UsingKeyboardLayout);
  console.log("KeyboardLayoutMap[UsingKeyboardLayout] = " + KeyboardLayoutMap[UsingKeyboardLayout]);
  
  for (var row = 0; row < KeyboardLayoutMap[UsingKeyboardLayout].length; row++)
  {
    for (var col = 0; col < KeyboardLayoutMap[UsingKeyboardLayout][row].length; col+=2)
    {
	
	//console.log("KeyboardLayoutMap[UsingKeyboardLayout][row].length = " + KeyboardLayoutMap[UsingKeyboardLayout][row].length + " row = " + row);
	
      var speedVal = getAverageSpeedForKey(row, col);
      var realCol = Math.floor( col / 2 ) + KeyPositionOffset[row];
      var theFinger = FingerToKeys[row][realCol];
      
	  //console.log("theFinger = " + theFinger + " speedVal = " + speedVal);
	  
      if ( speedVal != 0 ) 
      {
        FingerUsage[theFinger] = FingerUsage[theFinger] + speedVal;
        numTimeFingerUsed[theFinger]++;
      }
    } 
  }
  
  // factor in backspace character
  curCharCode = 8
  theFinger = FingerToKeys[0][13];
  if ( AverageTypedKeySpeed[ curCharCode ] != undefined ) 
  {
    FingerUsage[theFinger] = FingerUsage[theFinger] + AverageTypedKeySpeed[ curCharCode ];
    numTimeFingerUsed[theFinger]++;
  }
  
  var outputStr = "";
  for (var i = 0; i <= 8; i++)
  {
    if (numTimeFingerUsed[i] != 0)
    {
      FingerUsage[i] = FingerUsage[i] / numTimeFingerUsed[i];
    }
    outputStr += FingerUsage[i] + "\n";
  }
  //alert(outputStr);
}

function calculateAverageTypedKeySpeed()
{
  AverageTypedKeySpeed = []; 
  NumTimesKeyPressed = [];

  for (var i = 1; i < TypedKeysTime.length; i++)
  {
  
    if (AverageTypedKeySpeed[ TypedKeys[i] ] == undefined) {
      AverageTypedKeySpeed[ TypedKeys[i] ] = TypedKeysTime[i] - TypedKeysTime[i-1];
    } else {
      AverageTypedKeySpeed[ TypedKeys[i] ] += TypedKeysTime[i] - TypedKeysTime[i-1];
    }
	
	console.log("AverageTypedKeySpeed[ TypedKeys[i] ] = " + AverageTypedKeySpeed[ TypedKeys[i] ] + " TypedKeys[i] = " +  TypedKeys[i]);

    if (NumTimesKeyPressed[ TypedKeys[i] ] == undefined) {
      NumTimesKeyPressed[ TypedKeys[i] ] = 1; 
    } else {
      NumTimesKeyPressed[ TypedKeys[i] ]++;
    }

  }
  
  var theStr = "";
  
  for (var keyCode in AverageTypedKeySpeed)
  {
    theStr = theStr + "keyCode: " + keyCode + ", " + AverageTypedKeySpeed[ keyCode ];
    AverageTypedKeySpeed[ keyCode ] = AverageTypedKeySpeed[ keyCode ] / NumTimesKeyPressed[ keyCode ];
    theStr = theStr + "," + AverageTypedKeySpeed[ keyCode ] + "," + NumTimesKeyPressed[ keyCode ] + "\n";
  }
  //alert(theStr);
}

function endTest()
{
	clearTimeout(ClockTimeoutID);
	TimesUp = true;

	calculateAverageTypedKeySpeed();
	calculateFingerSpeeds();

	var calculatedCpm = calculateCpm();
	var calculatedWpm = Math.round(calculatedCpm / 5);

	//document.getElementById("finishedTypingScore").innerHTML = "You Type <span style=\"font-weight:bold;color:blue;\">" + calculatedWpm + "</span> Words Per Minute*";
   
	var tableHeaderRow = "<tr><td style=\"text-align:center;background-color:#C0C0C0;color:white;font-weight:bold;line-height:1.3;\" colspan=\"2\">Typing Stats</td></tr>";
	var wpmRow = "<tr><td style=\"color:black;text-align:left;\">Words Per Minute (WPM): </td><td style=\"color:black;text-align:right;\" > " + calculatedWpm + "</td></tr>";
	var cpmRow = "<tr><td style=\"color:black;text-align:left;\">Characters Per Minute (CPM): </td><td style=\"color:black;text-align:right;\"> " + calculatedCpm + "</td></tr>";

	var wordsCorrectRow = "<tr><td style=\"color:black;text-align:left;\">Words Correct: </td><td style=\"color:black;text-align:right;\"> " + WordsCorrect + "</td></tr>";
	var wordsIncorrectRow = "<tr><td style=\"color:black;text-align:left;\">Words Incorrect: </td><td style=\"color:black;text-align:right;\"> " + WordsIncorrect + "</td></tr>";

	var totalNumWords = WordsIncorrect + WordsCorrect;
	var accuracy = WordsCorrect / totalNumWords;
	var accuracy = Math.round(accuracy*100) + "%";

	var accuracyRow = "<tr><td style=\"color:black;text-align:left;\">Word Accuracy: </td><td style=\"color:black;text-align:right;\"> " + accuracy + "</td></tr>";
	var languageRow = "<tr><td style=\"color:black;text-align:left;\">Language: </td><td style=\"color:black;text-align:right;\"> English</td></tr>";

	var fastestFingerRow = "<tr><td style=\"color:black;text-align:left;\">Fastest Finger: </td><td style=\"color:black;text-align:right;\"> " + FingerMap[getFastestFinger()] + "</td></tr>";
	var slowestFingerRow = "<tr><td style=\"color:black;text-align:left;\">Slowest Finger: </td><td style=\"color:black;text-align:right;\"> " + FingerMap[getSlowestFinger()] + "</td></tr>";
	var fastestTypedKey = "<tr><td style=\"color:black;text-align:left;\">Fastested Typed Key: </td><td style=\"color:black;text-align:right;\"> " + WordsIncorrect + "</td></tr>";
	var slowestTypedKey = "<tr><td style=\"color:black;text-align:left;\">Slowest Typed Key: </td><td style=\"color:black;text-align:right;\"> " + WordsIncorrect + "</td></tr>";
	var topRowCpm = "<tr><td style=\"color:black;text-align:left;\">Top Row CPM: </td><td style=\"color:black;text-align:right;\"> " + WordsIncorrect + "</td></tr>";
	var middleRowCpm = "<tr><td style=\"color:black;text-align:left;\">Middle Row CPM: </td><td style=\"color:black;text-align:right;\"> " + WordsIncorrect + "</td></tr>";
	var bottomRowCpm = "<tr><td style=\"color:black;text-align:left;\">Bottom Row CPM: </td><td style=\"color:black;text-align:right;\"> " + WordsIncorrect + "</td></tr>";
	var letterCasingRow = "<tr><td style=\"color:black;text-align:left;\">Letter Casing: </td><td style=\"color:black;text-align:right;\"> " + getLetterCasing(true) + "</td></tr>";
	var layoutRow = "<tr><td style=\"color:black;text-align:left;\">Keyboard Layout: </td><td style=\"color:black;text-align:right;\"> " + PossibleKeyboardLayouts[UsingKeyboardLayout] + "</td></tr>";
	var timingRow = "<tr><td style=\"color:black;text-align:left;\">Test Duration: </td><td style=\"color:black;text-align:right;\"> " + TimerAmountStringMap[document.getElementById("lstTestTime").value] + "</td></tr>";
	//var advertiseDiv = "<div style=\"font-face:Verdana, arial, helvetica, sans-serif;font-size:14px;\">Stats From PAT or JK's <a href=\"http://patorjk.com/typing-speed-test/\">Typing Speed Test</a></div>";
	var advertiseDiv = "";

	var theRows = tableHeaderRow + wpmRow + cpmRow + fastestFingerRow + slowestFingerRow + accuracyRow + languageRow + letterCasingRow + layoutRow + timingRow;
	var badgeCode = "<center><table style=\"font-face:Verdana, arial, helvetica, sans-serif;font-size:14px;background-color:white;border-width:1px;border-style: solid;border-color: black;\"><tr><td style=\"margin:0px;padding:0px;\"><table style=\"margin:1px;padding:1px;\">" + theRows + "</table></td></tr></table></center>";
	var badgeCodeWithAd = "<center><table style=\"font-face:Verdana, arial, helvetica, sans-serif;font-size:14px;background-color:white;border-width:1px;border-style: solid;border-color: black;\"><tr><td style=\"margin:0px;padding:0px;\"><table style=\"margin:1px;padding:1px;\">" + theRows + "</table></td></tr></table>" + advertiseDiv + "</center>";

	var shareTypingStatsHeader = "<tr><td style=\"text-align:center;background-color:#C0C0C0;color:white;font-weight:bold;line-height:1.3;\">HTML For \"Typing Stats\" Table</td></tr>";
	var shareTypingStatsText = "<tr><td style=\"text-align:center;\"><textarea style=\"font-face:Verdana, arial, helvetica, sans-serif;font-size:14px;width:100%;height:140px;\">" + badgeCodeWithAd + "</textarea></td></tr>";
	var shareTypingStatsCode = "<center><table style=\"font-face:Verdana, arial, helvetica, sans-serif;font-size:14px;background-color:white;border-width:1px;border-style: solid;border-color: black;\"><tr><td style=\"margin:0px;padding:0px;\"><table style=\"width:500px;margin:1px;padding:1px;\">" + shareTypingStatsHeader + shareTypingStatsText + "</table></td></tr></table></center>";

	var fingerSpeedTableHeaderRow = "<tr><td style=\"text-align:center;background-color:#C0C0C0;color:white;font-weight:bold;line-height:1.3;\" colspan=\"2\">Average Finger Response Time (Milliseconds)</td></tr>";

	var fingerSpeedRows = new Array();
	for (var i = 0; i <= 8; i++)
	{
		if (FingerUsage[i].toFixed() == 0) {
			fingerSpeedRows[i] = "<tr><td style=\"color:black;text-align:left\">" + FingerMap[i] + ": </td><td style=\"color:black;text-align:right\"> N/A</td></tr>";
		} else {
			fingerSpeedRows[i] = "<tr><td style=\"color:black;text-align:left\">" + FingerMap[i] + ": </td><td style=\"color:black;text-align:right\"> " + FingerUsage[i].toFixed() + "</td></tr>"; //" Milliseconds</td></tr>";
		}
	}

	var fingerSpeedRows = fingerSpeedTableHeaderRow + fingerSpeedRows[1] + fingerSpeedRows[2] + fingerSpeedRows[3] + fingerSpeedRows[4] + fingerSpeedRows[5] + fingerSpeedRows[6] + fingerSpeedRows[7] + fingerSpeedRows[8] + fingerSpeedRows[0];
	var fingerSpeedStats = "<center><table style=\"color:#000000;font-face:Verdana, arial, helvetica, sans-serif;font-size:14px;background-color:white;border-width:1px;border-style: solid;border-color: black;\"><tr><td style=\"margin:0px;padding:0px;\"><table style=\"width:500px;margin:1px;padding:1px;\">" + fingerSpeedRows + "</table></td></tr></table></center>";
	
	var fingerSpeedStatsWithAd = "<center><table style=\"color:#000000;font-face:Verdana, arial, helvetica, sans-serif;font-size:14px;background-color:white;border-width:1px;border-style: solid;border-color: black;\"><tr><td style=\"margin:0px;padding:0px;\"><table style=\"width:500px;margin:1px;padding:1px;\">" + fingerSpeedRows + "</table></td></tr></table>" + advertiseDiv + "</center>";

	var shareFingerSpeedHeader = "<tr><td style=\"text-align:center;background-color:#C0C0C0;color:white;font-weight:bold;line-height:1.3;\" >HTML For \"Average Finger Response Time\" Table</td></tr>";
	var shareFingerSpeedText = "<tr><td style=\"text-align:center;\"><textarea style=\"font-face:Verdana, arial, helvetica, sans-serif;font-size:14px;width:100%;height:140px;\">" + fingerSpeedStatsWithAd + "</textarea></td></tr>";
	var shareFingerSpeedCode = "<center><table style=\"font-face:Verdana, arial, helvetica, sans-serif;font-size:14px;background-color:white;border-width:1px;border-style: solid;border-color: black;\"><tr><td style=\"margin:0px;padding:0px;\"><table style=\"width:500px;margin:1px;padding:1px;\">" + shareFingerSpeedHeader + shareFingerSpeedText + "</table></td></tr></table></center>";


	document.getElementById("finishedTypingStats").innerHTML = badgeCode; 
	document.getElementById("finishedFingerSpeeds").innerHTML = fingerSpeedStats;

	//document.getElementById("sharingCodeBoxes").innerHTML = "<center><div style=\"font-size:18px;\">HTML Code For Sharing Your Stats With Others</div><p/>" + shareTypingStatsCode + "<p/>" + shareFingerSpeedCode + "</center>";

	document.getElementById("typingInput").value = "";
	
	colorHotSpotVisualization();
	
	/* Result speed score */
	document.getElementById("scoreWPM").innerText = calculatedWpm;
	document.getElementById("scoreErrors").innerText = WordsIncorrect;
	document.getElementById("scoreAdjustedSpeed").innerText = calculatedWpm;
	
	document.getElementById("result-info-cpm").innerHTML = calculatedCpm + "<br>Characters per minute (CPM)";
	document.getElementById("result-info-accuracy").innerHTML = accuracy + "<br>Accuracy";
	document.getElementById("result-info-errors").innerHTML = WordsIncorrect + "<br>Words incorrect";
	/* End of Result speed score */
  
	/* Graphic speed meter */ 
	document.getElementById("amountDisplay").innerText = calculatedWpm;
  
	var speedProfile = "--";
	  
	var netSpeed = calculatedWpm;

	if ((netSpeed >= 0) && (netSpeed < 25)) {
		speedProfile = "Slow";
	} else if ((netSpeed >= 25) && (netSpeed < 45)) {
		speedProfile = "Average";
	} else if ((netSpeed >= 45) && (netSpeed < 60)) {
		speedProfile = "Fluent";	
	} else if ((netSpeed >= 60) && (netSpeed < 80)) {
		speedProfile = "Fast";	
	} else if (netSpeed >= 80) {
		speedProfile = "Pro";
	}

	var nwpm = calculatedWpm;

	var speedPos = 0;
	if (nwpm <= 2) speedPos = -8;
	else if ( nwpm >= 97){ speedPos = 365; }
	else speedPos = (Math.round(nwpm * 3.8)) - 28;

	document.getElementById("typing-speed-tag-Display").innerText = speedProfile;
	document.getElementById("typing-speed-tag-Display").className += " " + speedProfile.toLowerCase();
	document.getElementById("amountDisplay").style.left = speedPos + "px";
	/* End of Graphic speed meter */
	
	/* Generate finger speed chart */
	var FingeraArrayChart = ['Thumb', 'Pinky', 'Ring', 'Middle', 'Index'];
	var LeftHandFingerSpeedChart = [Math.round(FingerUsage[0]), Math.round(FingerUsage[1]), Math.round(FingerUsage[2]), Math.round(FingerUsage[3]), Math.round(FingerUsage[4])];
	RightHandFingerSpeedChart = [Math.round(FingerUsage[0]), Math.round(FingerUsage[8]), Math.round(FingerUsage[7]), Math.round(FingerUsage[6]), Math.round(FingerUsage[5])];

	LoadFingerSpeed(FingeraArrayChart, LeftHandFingerSpeedChart, RightHandFingerSpeedChart);

	/* End of generate finger speed chart */

	// fade out input container
	fadeOutInput(100); 
}

function generateTypingString() 
{
  var wordBank = getWordList();
  
  if (wordBank == "")
  {
    return ""; 
  }
  
  
  
  return wordBank;
}
    
function clockCountDown(secondsLeft)
{
  secondsLeft--;
  
  document.getElementById("timeLeft").innerHTML = "Time Left:<br/>" + secondsLeft + " seconds";
  
  if (secondsLeft == 0)
  {
    endTest();
  }
  else if (TimesUp == true) 
  {
    return;
  }
  else
  {
    ClockTimeoutID = setTimeout(function() {clockCountDown(secondsLeft);}, 1000);
  }
}

function clockCountUp()
{
  TimeCountSeconds++;
  
  document.getElementById("timeLeft").innerHTML = "Time Left:<br/>" + TimeCountSeconds + " seconds";
  
  if (TimesUp == true) 
  {
    return;
  }
  else
  {
    ClockTimeoutID = setTimeout(function() {clockCountUp();}, 1000);
  }
}

function resetTestSettings()
{
  clearTimeout(ClockTimeoutID);
  TimesUp = false;
  IsClockStarted = false;
  TypedKeys = [];
  TypedKeysTime = [];
  WhatUserTyped = [];
  WordsCorrect = 0;
  WordsIncorrect = 0;
  TimeCountSeconds = -1;
  WordAt = -1;

  setupDisplay();  
  document.getElementById("typingInput").value = "";
  document.getElementById("typingInput").focus();
}

function configResetTestSettingsKeyUp()
{
	if (navigator.userAgent.indexOf("Firefox")!=-1)
	{
		configResetTestSettings();
	}
}

function configResetTestSettings()
{
  clearTimeout(ClockTimeoutID);
  TimesUp = false;
  IsClockStarted = false;
  WordsCorrect = 0;
  WordsIncorrect = 0;
  TimeCountSeconds = -1;
  WordAt = -1;

  //console.log("lstLanguageInput ==> " + document.getElementById("lstLanguageInput").value);
  
  if (document.getElementById("lstLanguageInput").value == "thai") {
	KeyboardLayoutMap[0] = new Array();
	KeyboardLayoutMap[0][0] = "%_+åñ/ò-óÀô¶ÙØßÖõ¤öµ÷¨ø¢ùª";
	KeyboardLayoutMap[0][1] = "ðæ\"ä®Ó±¾¸ÐíÑêÕ³ÃÏ¹­Â°º,Å¥£";
	KeyboardLayoutMap[0][2] = "Ä¿¦Ë¯¡â´¬àçéëèÉÒÈÊ«Ç.§\n";
	KeyboardLayoutMap[0][3] = "(¼)»©áÎÍÚÔì×?·²ÁÌãÆ½";
	KeyboardLayoutMap[0][4] = " ";
  } else {
	KeyboardLayoutMap[0] = new Array();
	KeyboardLayoutMap[0][0] = "~`!1@2#3$4%5^6&7*8(9)0_-+=";
	KeyboardLayoutMap[0][1] = "QqWwEeRrTtYyUuIiOoPp{[}]|\\";
	KeyboardLayoutMap[0][2] = "AaSsDdFfGgHhJjKkLl:;\"'\n";
	KeyboardLayoutMap[0][3] = "ZzXxCcVvBbNnMm<,>.?/";
	KeyboardLayoutMap[0][4] = " ";
  }
  
  console.log("configResetTestSettings, KeyboardLayoutMap.length = " + KeyboardLayoutMap.length);

  setupDisplay();
  
  //document.getElementById("tab2").style.height = TypingTestHeight + "px";
}

function updateCurrentWord() 
{  
  WordAt++;
  if (WordsToType.length == WordAt)
  {
    endTest();
    CurrentWord = "";
  }
  else
  {
    CurrentWord = WordsToType[WordAt];
  }
}

function updateTypingDisplay()
{ 
  // make sure a valid word has been inputted
  if (WordAt >= WordsToType.length)
  {
    return; 
  }
  
  var inputDisplayIndex = WordAt;// % NumberOfWordsForDisplayBox;
  
  // deal with the previous word
  if (WordAt != 0)
  {
    var inputDisplayPreviousIndex = inputDisplayIndex - 1;
    var previousWordId = "word" + inputDisplayPreviousIndex;
      
    // if the previous index is -1, we're looking at a fresh block of text, so we need
    // to reset its color
    // otherwise, the previous word needs to be colored and stylized
    if (inputDisplayPreviousIndex == -1)
    {
      inputDisplayPreviousIndex = NumberOfWordsForDisplayBox - 1;
      previousWordId = "word" + inputDisplayPreviousIndex;
      document.getElementById(previousWordId).style.color = "black";
    }
    else
    {
		// figure out the coloring of the previous word
      var previousIndex = (WordAt - 1);
      if (WordsThatAreCorrect[previousIndex] == true)
      {
        document.getElementById(previousWordId).style.color = "blue";
      }
      else
      {
        document.getElementById(previousWordId).style.color = "#A626A6";
      }
    }
    document.getElementById(previousWordId).style.borderBottom = "none";
  }

  //console.log("updateTypingDisplay - inputDisplayIndex: " + inputDisplayIndex);
  
  // figure out the coloring of the current word (if needed)
  var currentWordId = "word" + inputDisplayIndex;
  if (WordsThatAreCorrect[WordAt] == false)
  {
    document.getElementById(currentWordId).style.color = "red";
  }

  document.getElementById(currentWordId).style.borderBottom = "thin solid #000000";
  var currentOffsetTop = document.getElementById(currentWordId).offsetTop;

  //console.log("updateTypingDisplay - currentOffsetTop = " + currentOffsetTop );
  
  if ( currentOffsetTop > MaxOffsetTop ) 
  {
    MaxOffsetTop = currentOffsetTop;
    var newTop = document.getElementById("typingAssignment").offsetTop - InputTextLineHeight;
    scrollTextToNewTop(document.getElementById("typingAssignment").offsetTop, newTop);
    //document.getElementById("typingAssignment").style.top = document.getElementById("typingAssignment").offsetTop - 22 + "px";
     
    //console.log("updateTypingDisplay - top = " + document.getElementById("typingAssignment").style.top);
    //console.log("updateTypingDisplay - MaxOffsetTop = " + MaxOffsetTop);
  }
}

function scrollTextToNewTop(startPos, topPos)
{
  //console.log("scrollTextToNewTop - entering");
  
  var newPos = startPos - 4;
  
  //console.log("scrollTextToNewTop - startPos = " + startPos);
  //console.log("scrollTextToNewTop - topPos = " + topPos);
  //console.log("scrollTextToNewTop - newPos = " + newPos);
  
  document.getElementById("typingAssignment").style.top = newPos + "px";
  if (document.getElementById("typingAssignment").offsetTop > topPos)
  {
    setTimeout(function() {scrollTextToNewTop(newPos, topPos);}, 25);  
  }
  else
  {
    document.getElementById("typingAssignment").style.top = topPos + "px";
  }
}

function checkInput(e)
{
  // keycodes:
  // 8 - backspace
  // 13 - enter
  // 32 - space
  
  var ret = true;
 
  if (TimesUp == true)
  {
    return false; 
  }
  
	if(window.event) { // IE
		keyNum = e.keyCode;
	} else if(e.which) { // Netscape/Firefox/Opera
		keyNum = e.which; //keyNum = e.which || e.keyCode;
	}

  // start clock if it hasn't start yet
  if (IsClockStarted == false)
  {
    IsClockStarted = true;
    
    if (TimerAmountMap[document.getElementById("lstTestTime").value] != 0)
    {
      clockCountDown(TimerAmountMap[document.getElementById("lstTestTime").value]); 
    }
    else
    {
      clockCountUp();
    }
  }

  // record what key was typed and at what time (for later analysis)
  
  //console.log("keyNum = " +  e.which + " " +  e.keyCode);
  
  txt = document.getElementById("typingInput").value;
  
  if (document.getElementById("lstLanguageInput").value == "thai") {
	if (txt.length > 0) {
		keyNum = txt.charCodeAt(txt.length - 1);
	}
  }
  
  TypedKeys.push(keyNum);
  TimeBase = new Date();
  TypedKeysTime.push(TimeBase.getTime());
  
  //if (keyNum  == 32 || keyNum == 13)

  //console.log("txt = " + txt);
  
  if (txt.length == CurrentWord.length) 
  {    
    //txt = document.getElementById("typingInput").value;
    
    WhatUserTyped.push(txt);
    
	//console.log(txt + " " + CurrentWord);
	
    if (txt == CurrentWord)
    {
	
	/*if (txt != " ") { 
		document.getElementById("wordTyped").innerText = parseInt(document.getElementById("wordTyped").innerText) + 1;
	}*/
	
      if (WordsThatAreCorrect[WordAt] != false)
      {
        WordsThatAreCorrect[WordAt] = true;
        WordsCorrect++;  
      }
      
      document.getElementById("typingInput").value = "";
      updateCurrentWord();

      ret = false;
    }
    else 
    {
      if (WordsThatAreCorrect[WordAt] == null)
      {
        WordsThatAreCorrect[WordAt] = false;
        WordsIncorrect++;
      }
      
      ret = true;
    }
    
    //document.getElementById("realTimeWordsCorrect").innerHTML = WordsCorrect;
    //document.getElementById("realTimeWordsIncorrect").innerHTML = WordsIncorrect;
    
    // Update the display box if needed
    //if ((WordAt % NumberOfWordsForDisplayBox) == 0)
    //{
//      setupTypingAssignment(WordsToType, WordAt, NumberOfWordsForDisplayBox);
    //}
    
    updateTypingDisplay();
  }
  
  return ret;
}

function setupApp()
{
  // Moby Dick book is the only book that is pre-loaded
  LoadedInputTextFunctions["Book_MobyDick"] = true;
  
  updateKeyboardLayout();
  colorInitialKeyboards();
  
  var ii = 0;
  var inputContainers = [];
  inputContainers[ii++] = "inputContainer";
  inputContainers[ii++] = "inputTab";
  setFadeInputContainers(inputContainers);
  
  var jj = 0;
  var outputContainers = [];
  outputContainers[jj++] = "outputContainer";
  outputContainers[jj++] = "hotSpotKeyboardContainer";
  
  var rr = 0;
  for (rr = 0; rr <= 13; rr++)
  {
    outputContainers[jj++] = "hot_key_0_"+rr;
  }
  for (rr = 0; rr <= 13; rr++)
  {
    outputContainers[jj++] = "hot_key_1_"+rr;
  }
  for (rr = 0; rr <= 12; rr++)
  {
    outputContainers[jj++] = "hot_key_2_"+rr;
  }
  for (rr = 0; rr <= 11; rr++)
  {
    outputContainers[jj++] = "hot_key_3_"+rr;
  }
  for (rr = 0; rr <= 7; rr++)
  {
    outputContainers[jj++] = "hot_key_4_"+rr;
  }
  
  setFadeOutputContainers(outputContainers);
  
  setupDisplay();

  //LoadingPanel.hide();
  document.getElementById("loading").className = "loadingInvisible";
  document.getElementById("loadingMessage").className = "loadingInvisible";

  document.getElementById("typingInput").value = "";
  document.getElementById("typingInput").focus();
  
  document.getElementById("wordTyped").innerText = 0;
}

function setupDisplay()
{

  if (TimerAmountMap[document.getElementById("lstTestTime").value] == 0)
  {
    //document.getElementById("timeLabel").innerHTML = "Time Typing:"; 
    document.getElementById("timeLeft").innerHTML = "Time Left:<br/>" + "0" + " seconds"; 
  }
  else
  {
    //document.getElementById("timeLabel").innerHTML = "Time Left:"; 
    document.getElementById("timeLeft").innerHTML = "Time Left:<br/>"  + TimerAmountMap[document.getElementById("lstTestTime").value] + " seconds"; 
  }
  
  //document.getElementById("realTimeWordsCorrect").innerHTML = WordsCorrect;
  //document.getElementById("realTimeWordsIncorrect").innerHTML = WordsIncorrect;
  
  MaxOffsetTop = InputTextLineHeight * 2; // line-height * 2
  document.getElementById("typingAssignment").style.top = 0;
  
  WordsToType = getWordList(); 
  
  if (WordsToType == "")
  {
    return; 
  }
  
  WordsThatAreCorrect = new Array(WordsToType.length);
  for (i = 0; i < WordsThatAreCorrect.length; i++)
  {
    WordsThatAreCorrect[i] = null; 
  }
  
  // NumberOfWordsForDisplayBox
  
  var maxTextInput = InputTextLengthMap[document.getElementById("lstTestTime").value];
  setupTypingAssignment(WordsToType, 0, maxTextInput);
  updateCurrentWord();
  updateTypingDisplay();
}

function setupTypingAssignment(typingInput, startingWord, numberOfWordsForDisplay) 
{
  var inputText = "";
  var index = 0;
  for (i = startingWord; i < (startingWord + numberOfWordsForDisplay); i++)
  {
    //inputText += "<span id=\"word" + index + "\" style=\"padding-bottom:1px;position:relative;\">" + typingInput[i] + "</span> ";
	inputText += "<span id=\"word" + index + "\" style=\"padding-bottom:1px;position:relative;\">" + typingInput[i] + "</span>";
    index++; 
  }
  //console.log("setupTypingAssignment - inputText = " + inputText);
  document.getElementById("typingAssignment").innerHTML = inputText;
}

function updateBookRelatedLanguage() {
	//var lstTestInput = document.getElementById("lstTestInput");
	//var length = lstTestInput.options.length;
	
	var lstTestInput = document.getElementById("lstTestInput");
	
	lstTestInput.options.length = 0;
	
	if (document.getElementById("lstLanguageInput").value == "thai") {
		var option = document.createElement("option");
		option.text = "True Touch";
		option.value = "Book_TrueTouch";
		lstTestInput.add(option);
		
		option = document.createElement("option");
		option.text = "Thai Language";
		option.value = "Book_ThaiLanguage";
		lstTestInput.add(option);
		
		option = document.createElement("option");
		option.text = "Call Center";
		option.value = "Book_CallCenter";
		lstTestInput.add(option);
		
		option = document.createElement("option");
		option.text = "¹Ô·Ò¹àÇµÒÅàÃ×èÍ§·Õè 1 àÃ×èÍ§¢Í§à¨éÒªÒÂÇÑªÃÁ¡Ø¯ ¡Ñº¾ÃÐÊËÒÂª×èÍ ¾Ø·¸ÔÈÃÕÃÐ";
		option.value = "Book_Vetala_Panchvimshati";
		lstTestInput.add(option);
		
	} else {
		var option = document.createElement("option");
		option.text = "Book Text: Moby-Dick; or, The Whale";
		option.value = "Book_MobyDick";
		lstTestInput.add(option);
		
		option = document.createElement("option");
		option.text = "Steve Jobs' 2005 Stanford Commencement Address";
		option.value = "Book_SteveJobs";
		lstTestInput.add(option);
	}
}