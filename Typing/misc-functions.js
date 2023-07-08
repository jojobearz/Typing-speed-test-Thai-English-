function generateRandomWordArray(inputArray, numItems)
{ 
  var randomizedArray = [];
  var index = 0;
  
  do 
  {
    do 
    {
      randNum = Math.floor(Math.random() * inputArray.length);
      theWord = inputArray[randNum];
    } while ((theWord == randomizedArray[Math.max(0, index - 1)] ||
              theWord == randomizedArray[Math.max(0, index - 2)] ||
              theWord == randomizedArray[Math.max(0, index - 3)] ||
              theWord == randomizedArray[Math.max(0, index - 4)] ||
              theWord == randomizedArray[Math.max(0, index - 5)]) );
    randomizedArray[index] = theWord;
    index++;
  } while ( index < numItems );
  
  return randomizedArray;
}