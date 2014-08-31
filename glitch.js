/** 
* glitch.js - Version 3.1
*	A highly flexible glitch effect written in Javascript using jQuery and HTML5 shadows.
*	(C) Benjamin Gwynn 2014 - http://xenxier.tk
*
*	~ Note: Now requires jQuery and functions differently as of 3.0 update ~
*
*	Integrate into your website as follows:
*	<script>$(window).onload(function(){glitch();});</script>
*
*	You can then use glitch.js on any text object like this:
*	<p class='glitch'>Sample glitch text</p>
*
*	...and any div using the following:
*	<div class='glitch' style='width=100px; height=100px;'></div>
*
*	And now on transparent PNG images too!
*	<img class='glitch' src="imagelocation.png"></img>
*
*	Enjoy!
**/

/** Glitch Configuration */
var distort_class_name = ".glitch";
var distort_blur = 0.5;
var distort_chance = 6;
var distort_speed = 50;
var distort_range = 6;
var distort_divs = true;
var distort_text = true;
var distort_images = true;
var distort_backwards = false;
var distort_objects_one_at_a_time = false;
var distort_using_rgba = true;
var distort_svg_url = "//rawgit.com/benjamingwynn/glitch.js/master/shadow.svg";

/** Glitch colours */
var distort_colours = [
	[
		"#FE57FF",
		"#FD08FF"
	],
	[
		"#58FF57",
		"#0AFF08"
	]
];

var distort_colours_rgba = [
	[
		[254, 87, 255, 0.5],
		[253, 8, 255, 1]
	],
	[ 
		[88, 255, 87, 0.5],
		[10, 255, 8, 1]
	]
];

/** Unconfigurable Variables */
var glitchRefreshIntervalId;
var distort_range_negative;
var distort_count = 0;
var distort_object_count = 0;
var distort_colour_number = 0;

function glitch() {
	console.info("glitch.js version 3.1 now loaded. Created by Xenxier (Benjamin Gwynn) - http://xenxier.tk");
	
	distort_object_count = $(distort_class_name).length;
	
	if (distort_images) {
		console.info("glitch.js is currently set to distort images, please note that this only currently works on WebKit based browsers.");
	}
	
	if (distort_backwards) {
		distort_range_negative = 0 - distort_range;
	} else {
		distort_range_negative = 0;
	}
	
	glitchRefreshIntervalId = setInterval(function() {
		for (var i = 0; i < $(distort_class_name).length; i++) {
			removeShadow($($(distort_class_name).get(i)));
		}
		
		// On a random chance (OR if the glitch effect needs to repeat to display the next colour in the colour sets table):
		if (getRandomNumber(0, distort_chance) == 0 || distort_colour_number > 0) {
			distort_count++;
			
			// Get our distort object:
			if (distort_objects_one_at_a_time) {
				distort_object = $($(distort_class_name).get(getRandomNumber(0, $(distort_class_name).length - 1)));
			} else {
				distort_object = $(distort_class_name);
			}
			
			// Get a colour. Be wary that this will get a table with RGBA values in if distort_using_rgba is true.
			if (distort_using_rgba) {
				colour = distort_colours_rgba[distort_colour_number][getRandomNumber(0,distort_colours_rgba[distort_colour_number].length - 1)];
			} else {
				colour = distort_colours[distort_colour_number][getRandomNumber(0,distort_colours[distort_colour_number].length - 1)];
			}
			
			// Distort:
			if (distort_objects_one_at_a_time) {
				if ($(distort_object).is('div') && distort_divs) {
					addRandomShadow(distort_object, colour);
				} else if ($(distort_object).is('img') && distort_images) {
					addRandomImageShadow(distort_object, colour);
				} else if (distort_text) {
					addRandomTextShadow(distort_object, colour);
				}
			} else {
				for (var i = 0; i < $(distort_object).length; i++) {
					var x = $($(distort_object).get(i));
					if ($(x).is('div') && distort_divs) {
						addRandomShadow(x, colour);
					} else if ($(x).is('img') && distort_images) {
						addRandomImageShadow(x, colour);
					} else if (distort_text) {
						addRandomTextShadow(x, colour);
					}
				}
			}
			
			// Modify what colour we will have next:
			if (distort_colour_number == distort_colours.length - 1) {
				distort_colour_number = 0;
			} else {
				distort_colour_number++;
			}
		}
	}, distort_speed);
}

function addRandomShadow(distort_object, colour) {
	if (distort_using_rgba) {
		$(distort_object).css("box-shadow", getRandomNumber(distort_range_negative, distort_range) + "px " + getRandomNumber(distort_range_negative, distort_range) + "px " + distort_blur + "px rgba(" + colour[0] + ", " + colour[1] + ", " + colour[2] + ", " + colour[3] + ")");
	} else {
		$(distort_object).css("box-shadow", getRandomNumber(distort_range_negative, distort_range) + "px " + getRandomNumber(distort_range_negative, distort_range) + "px " + distort_blur + "px " + colour);
	}
}

function addRandomTextShadow(distort_object, colour) {
	if (distort_using_rgba) {
		$(distort_object).css("text-shadow", getRandomNumber(distort_range_negative, distort_range) + "px 0px " + distort_blur + "px rgba(" + colour[0] + ", " + colour[1] + ", " + colour[2] + ", " + colour[3] + ")");
	} else {
		$(distort_object).css("text-shadow", getRandomNumber(distort_range_negative, distort_range) + "px 0px " + distort_blur + "px " + colour);
	}
}

function addRandomImageShadow(distort_object, colour) {
	var offX = getRandomNumber(distort_range_negative, distort_range);
	var offY = 0;
	var blur = distort_blur;
	
	if (distort_using_rgba) {
		$(distort_object).css("filter", "drop-shadow(" + offX + "px " + offY + "px " + blur + "px rgba(" + colour[0] + ", " + colour[1] + ", " + colour[2] + ", " + colour[3] + "))");
		$(distort_object).css("-webkit-filter", "drop-shadow(" + offX + "px " + offY + "px " + blur + "px rgba(" + colour[0] + ", " + colour[1] + ", " + colour[2] + ", " + colour[3] + "))");
	} else {
		$(distort_object).css("filter", "drop-shadow(" + offX + "px " + offY + "px " + blur + "px " + colour + ")");
		$(distort_object).css("-webkit-filter", "drop-shadow(" + offX + "px " + offY + "px " + blur + "px " + colour + ")");
	}
}

function removeShadow(object) {
	if ($(object).is('div') && distort_divs) {
		$(object).css('box-shadow', 'none');
	} else if ($(object).is('img') && distort_images) {
		$(object).css("filter", "none");
		$(object).css("-webkit-filter", "none");
	} else if (distort_text) {
		$(object).css('text-shadow', 'none');
	}
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function stopGlitch() {
	console.log("Stopping glitch.js now!");
	clearInterval(glitchRefreshIntervalId);
}
