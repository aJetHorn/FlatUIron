//FlatColors is a built-in color palette sourced from http://flatuicolors.com/
var FlatColors = [
  ["Turquoise", "#1abc9c", {R:26, G:188, B:156}],
  ["Green Sea", "#16a085", {R:22, G:160, B:133}],
  ["Emerald", "#2ecc71", {R:46, G:204, B:113}],
  ["Nephritis", "#27ae60", {R:39, G:174, B:96}],
  ["Peter River", "#3498db", {R:52, G:152, B:219}],
  ["Belize Hole", "#2980b9", {R:41, G:128, B:185}],
  ["Amethyst", "#9b59b6", {R:155, G:89, B:182}],
  ["Wisteria", "#8e44ad", {R:142, G:68, B:173}],
  ["Wet Asphalt", "#34495e", {R:52, G:73, B:94}],
  ["Midnight Blue", "#2c3e50", {R:44, G:62, B:80}],
  ["Sun Flower", "#f1c40f", {R:241, G:196, B:15}],
  ["Orange", "#f39c12", {R:243, G:156, B:18}],
  ["Pumpkin", "#d35400", {R:211, G:84, B:0}],
  ["Alizarin", "#e74c3c", {R:231, G:76, B:60}],
  ["Pomegranate", "#c0392b", {R:192, G:57, B:43}],
  ["Clouds", "#ecf0f1", {R:236, G:240, B:241}],
  ["Silver", "#bdc3c7", {R:189, G:195, B:199}],
  ["Concrete", "#95a5a6", {R:149, G:165, B:166}],
  ["Asbestos", "#7f8c8d", {R:127, G:140, B:141}]
];

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      // var firstHref = $("a[href^='http']").eq(0).attr("href");
      //$("body").prepend("Working...");

      //console.log($("body").css("backgroundColor"));
      //console.log(parseRGB("rgb(0, 1, 5)"));
      flatUIron();
      //console.log(findClosestColorMatch({R:0,G:0,B:0},FlatColors));
      //$("body").css({"backgroundColor": "rgb(0,0,0)"});
    }
  }
);

/*
* Turquoise: #1abc9c rgb(26, 188, 156)
* Green Sea: #16a085 rgb(22, 160, 133)
* Emerald: #2ecc71 rgb(46, 204, 113)
* Nephritis: #27ae60 rgb(39, 174, 96)
* Peter River: #3498db rgb(52, 152, 219)
* Belize Hole: #2980b9 rgb(41, 128, 185)
* Amethyst: #9b59b6 rgb(155, 89, 182)
* Wisteria: #8e44ad rgb(142, 68, 173)
* Wet Asphalt: #34495e rgb(52, 73, 94)
* Midnight Blue: #2c3e50 rgb(44, 62, 80)
* Sun Flower: #f1c40f rgb(241, 196, 15)
* Orange: #f39c12 rgb(243, 156, 18)
* Carrot: #e67e22 rgb(230, 126, 34)
* Pumpkin: #d35400 rgb(211, 84, 0)
* Alizarin: #e74c3c rgb(231, 76, 60)
* Pomegranate: #c0392b rgb(192, 57, 43)
* Clouds: #ecf0f1 rgb(236, 240, 241)
* Silver: #bdc3c7 rgb(189, 195, 199)
* Concrete: #95a5a6 rgb(149, 165, 166)
* Asbestos: #7f8c8d rgb(127, 140, 141)
*/

/*
* Remove shadows?
* Remove gradients?
*/

/*
* border-color, color, background-color
*
*/

/*
* Websites with flat colors:
* http://flatuicolors.com/
* http://www.flatuicolorpicker.com/
* http://bootflat.github.io/color-picker.html
* 
*/

//iterate over all elements, detect colors, change colors to closest matching flat colors, as defined above
function flatUIron(){
	//iterate over each element on the dom
  flattenBackgroundColor($("body"));
	$('body *').each(function(index, element){
		//console.log(this.css());
    //console.log(element.css("backgroundColor"));
    //console.log(this);
    //console.log($(element).css("backgroundColor"));
    //console.log($(element).css("color"));
    //$(element).css({"backgroundColor": "rgb(0,0,0)"});
    flattenColors(element);
    //console.log($(element).attr('style').indexOf('backgroundColor'));
    // if ($('element[style*="backgroundColor"]').length > 0){
    //   console.log("yerp");
    // }
	});
}

//returns a flattened RGB color
//Expects RGB object
function flattenColors(element){
  flattenBackgroundColor(element);
  flattenFontColor(element);
  //flattenBorderColors(element);
  //$(element).css({"backgroundColor": findClosestColorMatch(parseRGB($(element).css("backgroundColor")), FlatColors)});
}

function flattenBackgroundColor(element){
  var originalColor = $(element).css("backgroundColor");
  console.log("original color: " + originalColor);
  if (originalColor == "rgb(0, 0, 0)"){
    $(element).css({"backgroundColor": "#2c3e50"});
    console.log("black");
    return;
  }
  if (originalColor == "rgb(255, 255, 255)"){
    $(element).css({"backgroundColor": "#ecf0f1"});
    console.log("white");
    return;
  }
  var originalColorRGB = parseRGB(originalColor);
  console.log("original color RGB: " + originalColorRGB.R + originalColorRGB.G + originalColorRGB.B);
  var closestMatch = findClosestColorMatch(originalColorRGB, FlatColors);
  console.log(closestMatch);
  var optionalA = "";
  var optionalAValue = "";
  if (originalColorRGB.A != undefined){
    optionalA = "a";
    optionalAValue = originalColorRGB.A;
  }
  $(element).css({"backgroundColor": "rgb" + optionalA +"(" + closestMatch.R + "," + closestMatch.G + "," + closestMatch.B + optionalAValue + ")"});
}

function flattenFontColor(element){
  if ($(element).text() == ""){
    return;
  }
  var originalColor = $(element).css("color");
  console.log("original color: " + originalColor);
  var originalColorRGB = parseRGB(originalColor);
  console.log("original color RGB: " + originalColorRGB.R + originalColorRGB.G + originalColorRGB.B);
  var closestMatch = findClosestColorMatch(originalColorRGB, FlatColors);
  console.log(closestMatch);

  $(element).css({"color": "rgb(" + closestMatch.R + "," + closestMatch.G + "," + closestMatch.B + ")"});

}

function flattenBorderColors(element){

}


//expects rgb(r,g,b) or rgba(r,g,b,a) string
function parseRGB(RGB){
  var colors = RGB.substring(0, RGB.length-1);
  colors = colors.split("(")[1];
  colors = colors.split(",");
  //console.log(colors);
  var optionalA = undefined;
  if (RGB.indexOf("a") > -1){
    optionalA = parseInt(colors[3].trim());
  }
  var returnObject = {R: parseInt(colors[0].trim()), G: parseInt(colors[1].trim()), B: parseInt(colors[2].trim()), A: optionalA};
  console.log(returnObject);
  return returnObject;
}

//var RGB ={R:num, G:num, B:num};

//expects formatted rgb object
//ColorPalette objects: name, rgb
//returns RGB object
function findClosestColorMatch(inputRGB, ColorPalette){
  var closestMatchName = ColorPalette[0][0];
  var closestMatchHex = ColorPalette[0][1];
  var closestMatchRGB = ColorPalette[0][2];
  var smallestDifference = 9999;

  for (var i = 0; i < ColorPalette.length; i++){
    var difference = Math.abs(inputRGB.R - ColorPalette[i][2].R) + Math.abs(inputRGB.G - ColorPalette[i][2].G) + Math.abs(inputRGB.B - ColorPalette[i][2].B);
    if (difference < smallestDifference){
      smallestDifference = difference;
      closestMatchName = ColorPalette[i][0];
      closestMatchHex = ColorPalette[i][1];
      closestMatchRGB = ColorPalette[i][2]
    }
  }
  // console.log(closestMatchName);
  // console.log(closestMatchHex);
  // console.log(closestMatchRGB);
  // console.log(smallestDifference);
  return closestMatchRGB;
}
