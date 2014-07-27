/** 
* glitch.js - Version 2.1
*   (C) Benjamin Gwynn 2014 - http://xenxier.tk
*
**/

/** Glitch Configuration */
var distort_colours = [ [ "#FE57FF", "#FD08FF"], ["#58FF57", "#0AFF08"] ];
var distortable_objects = ['body'];
var distort_distortable_objects = true;
var distort_blur = 1;
var distort_chance = 6;
var distort_text = true;
var distort_text_types = ["h1", "h2", "h3", "p"];
var speed = 50;
var distort_only_text_inside_distortable_objects = false;
var distort_range = 6;
var distort_backwards = false;

if (distort_range_negative) {
	var distort_range_negative = 0 - distort_range;
} else {
	var distort_range_negative = 0;
}

window.onload = function start() {
	glitch();
}

function glitch() {
	if (!distort_colour_number) {
		var distort_colour_number = 0;
	};
	setInterval(function() {
		for (var i = 0; i < distortable_objects.length; i++) {
			removeShadow(document.getElementById(distortable_objects[i]));
		}
		removeAllTextShadows();
		if (getRandomNumber(0, distort_chance) == 0 || distort_colour_number > 0) {
			distort_object_name = distortable_objects[Math.floor((Math.random() * distortable_objects.length))];
			distort_object = document.getElementById(distort_object_name);
			colour = distort_colours[distort_colour_number][Math.floor((Math.random() * distort_colours[distort_colour_number].length))];
			if (distort_distortable_objects) {
				addRandomShadow(distort_object, colour)
			}
			if (distort_text) {
				for (var i = 0; i < distort_text_types.length; i++) {
					for (var l = 0; l < document.getElementsByTagName(distort_text_types[i]).length; l++) {
						if (document.getElementsByTagName(distort_text_types[i])[l].parentNode == distort_object && distort_only_text_inside_distortable_objects) {
							addRandomTextShadow(document.getElementsByTagName(distort_text_types[i])[l], colour);
						} else if (!distort_only_text_inside_distortable_objects) {
							addRandomTextShadow(document.getElementsByTagName(distort_text_types[i])[l], colour);
						}
					}
				}
			}
			if (distort_colour_number == distort_colours.length - 1) {
				distort_colour_number = 0;
			} else {
				distort_colour_number = distort_colour_number + 1;
			}
		}
	}, speed);
}

function addRandomShadow(distort_object, colour) {
	distort_object.style.boxShadow=getRandomNumber(distort_range_negative, distort_range) + "px " + getRandomNumber(distort_range_negative, distort_range) + "px " + distort_blur + "px " + colour;
}

function addRandomTextShadow(distort_object, colour) {
	distort_object.style.textShadow=getRandomNumber(distort_range_negative, distort_range) + "px 0px " + distort_blur + "px " + colour;
}

function removeShadow(distort_object) {
	distort_object.style.boxShadow="none";
}

function removeAllTextShadows() {
	for (var i = 0; i < distort_text_types.length; i++) {
		for (var l = 0; l < document.getElementsByTagName(distort_text_types[i]).length; l++) {
			document.getElementsByTagName(distort_text_types[i])[l].style.textShadow="none";
		}
	}
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}
