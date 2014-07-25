    /** 
		* Xenxier's Glitch Script
		*   (C) Benjamin Gwynn 2014 - http://xenxier.tk
		*
		**/
		
		// Glitch Configuration
		var distort_colours = [ "#FD08FF", "#0AFF08" ];
		var distort_object_name = 'body';
		var distort_blur = 5;
		var distort_chance = 6;
		var distort_text = true;
		var distort_text_types = ["h1", "h2", "h3", "p"];
		var distort_text_multicolour = false;
		var shape_chance = 4;
		var speed = 50;
		
		var distort_object;
		
		window.onload = function start() {
			glitch();
			distort_object = document.getElementById(distort_object_name);
		}
		
		function glitch() {
			setInterval(function() {
				removeShadow(distort_object);
				removeAllTextShadows();
				//hideGlitchShapes();
				if (getRandomNumber(0, shape_chance) == 0) {
					//createGlitchShape(getRandomNumber(0, window.innerWidth), getRandomNumber(0, window.innerHeight), getRandomNumber(60, 150), getRandomNumber(20, 100));
				}
				if (getRandomNumber(0, distort_chance) == 0) {
					colour = distort_colours[Math.floor((Math.random() * distort_colours.length))];
					addRandomShadow(distort_object, colour)
					if (distort_text == true) {
						for (var i = 0; i < distort_text_types.length; i++) {
							for (var l = 0; l < document.getElementsByTagName(distort_text_types[i]).length; l++) {
								if (distort_text_multicolour == true) {
									colour = distort_colours[Math.floor((Math.random() * distort_colours.length))];
								}
								addRandomTextShadow(document.getElementsByTagName(distort_text_types[i])[l], colour);
							}
						}
					}
				}
			}, speed);
		}
		
		function addRandomShadow(distort_object, colour) {
			distort_object.style.boxShadow=getRandomNumber(-3, 3) + "px " + getRandomNumber(-3, 3) + "px " + distort_blur + "px " + colour;
		}
		
		function addRandomTextShadow(distort_object, colour) {
			distort_object.style.textShadow=getRandomNumber(0, 3) + "px 0px 1px " + colour;
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
		
		function createGlitchShape(left, top, width, height) {
			var shape;
			if (getRandomNumber(0, 1) == 0) {
				shape = document.getElementById('glitch');
			} else {
				shape = document.getElementById('glitchCircle');
				height = width; // Stop our circles from squishing.
			}
			
			shape.style.left = left + "px";
			shape.style.top = top + "px";
			shape.style.width = width + "px";
			shape.style.height = height + "px";
			
			shape.style.display = "visible";
		}
		
		function hideGlitchShapes() {
			document.getElementById('glitch').style.display = "none";
			document.getElementById('glitchCircle').style.display = "none";
		}
