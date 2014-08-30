/** 
* glitch.js - Version 3.0
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
*	Enjoy!
**/

/** Glitch Configuration */
var distort_colours = [ [ "#FE57FF", "#FD08FF"], ["#58FF57", "#0AFF08"] ];
var distort_class_name = '.glitch';
var distort_blur = 1;
var distort_chance = 6;
var distort_speed = 50;
var distort_range = 6;
var distort_divs = true;
var distort_text = true;
var distort_backwards = false;
var distort_objects_one_at_a_time = false;

/** Unconfigurable Variables */
var glitchRefreshIntervalId;
var distort_range_negative;
var distort_count = 0;
var distort_object_count = 0;
var distort_colour_number = 0;

function glitch() {
	console.info("Loaded glitch.js version 3.0. Created by Xenxier (Benjamin Gwynn) - http://xenxier.tk");
	
	distort_object_count = $(distort_class_name).length;
	
	if (distort_backwards) {
		distort_range_negative = 0 - distort_range;
	} else {
		distort_range_negative = 0;
	}
	
	glitchRefreshIntervalId = setInterval(function() {
		removeShadow(distort_class_name);
		
		// On a random chance (OR if the glitch effect needs to repeat to display the next colour in the colour sets table):
		if (getRandomNumber(0, distort_chance) == 0 || distort_colour_number > 0) {
			distort_count++;
			
			// Get our distort object:
			if (distort_objects_one_at_a_time) {
				distort_object = $($(distort_class_name).get(getRandomNumber(0, $(distort_class_name).length - 1)));
			} else {
				distort_object = $(distort_class_name);
			}
			
			// Get a colour:
			colour = distort_colours[distort_colour_number][getRandomNumber(0,distort_colours[distort_colour_number].length)];
			
			// Distort:
			if (distort_objects_one_at_a_time) {
				if ($(distort_object).is('div') && distort_divs) {
					addRandomShadow(distort_object, colour);
				} else if (distort_text) {
					addRandomTextShadow(distort_object, colour);
				}
			} else {
				for (var i = 0; i < $(distort_object).length; i++) {
					var x = $($(distort_object).get(i));
					if ($(x).is('div') && distort_divs) {
						addRandomShadow(x, colour);
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
	$(distort_object).css('box-shadow', getRandomNumber(distort_range_negative, distort_range) + "px " + getRandomNumber(distort_range_negative, distort_range) + "px " + distort_blur + "px " + colour);
}

function addRandomTextShadow(distort_object, colour) {
	$(distort_object).css('text-shadow', getRandomNumber(distort_range_negative, distort_range) + "px 0px " + distort_blur + "px " + colour);
}

function removeShadow(object) {
	$(object).css('box-shadow', 'none');
	$(object).css('text-shadow', 'none');
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function stopGlitch() {
	console.log("Stopping glitch.js now!");
	clearInterval(glitchRefreshIntervalId);
}
