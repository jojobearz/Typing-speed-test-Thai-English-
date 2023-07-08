var FadeInterface_InputContainers = [];
var FadeInterface_OutputContainers = [];
var FadeInterface_CurrentlyTransitioningLayout = false;
var FadeInterface_IsIE = false;
if (navigator.appName.indexOf("Microsoft")!=-1) {
	FadeInterface_IsIE = true;
}

function setFadeInputContainers(inputArray)
{
  FadeInterface_InputContainers = [];
  for (var i = 0; i < inputArray.length; i++)
  {
    FadeInterface_InputContainers[i] = inputArray[i];
  }
}

function setFadeOutputContainers(outputArray)
{
  FadeInterface_OutputContainers = [];
  for (var i = 0; i < outputArray.length; i++)
  {
    FadeInterface_OutputContainers[i] = outputArray[i];
  }
}

function fadeOutInput(level)
{ 
  var timeoutDur = 10;
  var theObj = null;

	if (FadeInterface_IsIE == true)
	{
	  for (var i = 0; i < FadeInterface_InputContainers.length; i++)
	  {
	    theObj = document.getElementById(FadeInterface_InputContainers[i]); 
		  theObj.style.filter = "alpha(opacity=" + level + ")";
		}
	}
	else
	{
	  for (var i = 0; i < FadeInterface_InputContainers.length; i++)
	  {
	    theObj = document.getElementById(FadeInterface_InputContainers[i]); 
		  theObj.style.opacity = level/100;
		}
	} 

  if (level <= 0)
  {
    for (var i = 0; i < FadeInterface_InputContainers.length; i++)
	  {
	    theObj = document.getElementById(FadeInterface_InputContainers[i]); 
      theObj.style.display = "none"; 
    }

    // now to deal with the result container
    
    level = 0;
  	if (FadeInterface_IsIE == true)
  	{
  	  for (var i = 0; i < FadeInterface_OutputContainers.length; i++)
  	  {
  	    theObj = document.getElementById(FadeInterface_OutputContainers[i]); 
  		  theObj.style.filter = "alpha(opacity=" + level + ")";
  		}
  	}
  	else
  	{
  	  for (var i = 0; i < FadeInterface_OutputContainers.length; i++)
  	  {
  	    theObj = document.getElementById(FadeInterface_OutputContainers[i]); 
  		  theObj.style.opacity = level/100;
  		}
  	} 

	  for (var i = 0; i < FadeInterface_OutputContainers.length; i++)
	  {
	    theObj = document.getElementById(FadeInterface_OutputContainers[i]); 
    	theObj.style.display = "block"; 
    }
  	fadeInResults(0);
  }
  else
  {
    setTimeout(function() {fadeOutInput(level-5);}, timeoutDur);
  }
}
function fadeInResults(level)
{
  var timeoutDur = 10;
  var theObj = null;

	if (FadeInterface_IsIE == true)
	{
	  for (var i = 0; i < FadeInterface_OutputContainers.length; i++)
	  {
	    theObj = document.getElementById(FadeInterface_OutputContainers[i]);
		  theObj.style.filter = "alpha(opacity=" + level + ")";
		}
	}
	else
	{
	  for (var i = 0; i < FadeInterface_OutputContainers.length; i++)
	  {
	    theObj = document.getElementById(FadeInterface_OutputContainers[i]);
		  theObj.style.opacity = level/100;
		}
	} 

  if (level >= 100)
  {
    // we're done
    FadeInterface_CurrentlyTransitioningLayout = false;
  }
  else
  {
    setTimeout(function() {fadeInResults(level+5);}, timeoutDur);
  }
}

function fadeOutResults(level, callbackFunct)
{
  var timeoutDur = 10;
  var theObj = null;//document.getElementById(FadeInterface_OutputContainer);

	if (FadeInterface_IsIE == true)
	{
	  for (var i = 0; i < FadeInterface_OutputContainers.length; i++)
	  {
	    theObj = document.getElementById(FadeInterface_OutputContainers[i]);
		  theObj.style.filter = "alpha(opacity=" + level + ")";
		}
	}
	else
	{
	  for (var i = 0; i < FadeInterface_OutputContainers.length; i++)
	  {
	    theObj = document.getElementById(FadeInterface_OutputContainers[i]);
		  theObj.style.opacity = level/100;
		}
	} 

  if (level <= 0)
  {
	  for (var i = 0; i < FadeInterface_OutputContainers.length; i++)
	  {
	    theObj = document.getElementById(FadeInterface_OutputContainers[i]);
      theObj.style.display = "none"; 
    }

    // now to deal with the input container
    //theObj = document.getElementById(FadeInterface_InputContainer); 
    level = 0;
  	if (FadeInterface_IsIE == true)
  	{
  	  for (var i = 0; i < FadeInterface_InputContainers.length; i++)
  	  {
  	    theObj = document.getElementById(FadeInterface_InputContainers[i]);
  		  theObj.style.filter = "alpha(opacity=" + level + ")";
  		}
  		
  	}
  	else
  	{
  	  for (var i = 0; i < FadeInterface_InputContainers.length; i++)
  	  {
  	    theObj = document.getElementById(FadeInterface_InputContainers[i]);
  		  theObj.style.opacity = level/100;
  		}
  	} 
  	for (var i = 0; i < FadeInterface_InputContainers.length; i++)
    {
      theObj = document.getElementById(FadeInterface_InputContainers[i]);
  	  theObj.style.display = "block"; 
  	}
  	fadeInInput(0, callbackFunct);
  }
  else
  {
    setTimeout(function() {fadeOutResults(level-5, callbackFunct);}, timeoutDur);
  }
}
function fadeInInput(level,callbackFunct)
{
  var timeoutDur = 10;
  var theObj = null;//document.getElementById(FadeInterface_InputContainer);

  if (level == 0)
  {
    eval(callbackFunct); 
  }

	if (FadeInterface_IsIE == true)
	{
	  for (var i = 0; i < FadeInterface_InputContainers.length; i++)
	  {
	    theObj = document.getElementById(FadeInterface_InputContainers[i]);
		  theObj.style.filter = "alpha(opacity=" + level + ")";
		}
		
	}
	else
	{
	  for (var i = 0; i < FadeInterface_InputContainers.length; i++)
	  {
	    theObj = document.getElementById(FadeInterface_InputContainers[i]);
		  theObj.style.opacity = level/100;
		}
		
	} 

  if (level >= 100)
  {
    // we're done
    FadeInterface_CurrentlyTransitioningLayout = false;
  }
  else
  {
    setTimeout(function() {fadeInInput(level+5,callbackFunct);}, timeoutDur);
  }
}


/*
  Generic reset that you'll need to put in your project
*/
function resetLayout(callbackFunct)
{
  if (FadeInterface_CurrentlyTransitioningLayout == true)
  {
    return; 
  }
  FadeInterface_CurrentlyTransitioningLayout = true;
  
  fadeOutResults(100, callbackFunct);
}