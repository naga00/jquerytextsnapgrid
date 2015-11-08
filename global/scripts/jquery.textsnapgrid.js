/**
 * jquery.textsnapgrid.js
 * Dual licensed under the MIT and GPL licenses.
 * base tool is opentype.js
  * https://nodebox.github.io/opentype.js/
 * Date: 2015-11-1
 * @version 1.0.0

 */

(function($) {
	$.fn.textsnapgrid = function(options){
		var parent = this;

		options = $.extend({
			fontFileName: '',
			fontSize: 150,
			textToRender: "",
			type: "normal",
			x: 0,
			y: 150,
			kerning: true,
			snapStrength: 100,
			snapDistance: 100,
			snapX: 0,
			snapY: 0,
			frames: 2.0,
			delay: 0.0,
			tick: 0.5,
			parent: this,
			setPosition: function () {}
		}, options);

		this.each(function() {
			var element = $(this);
			var font = null;
			var timer = null;
			var snapStrength;
			var snapDistance;
			var snapX;
			var snapY;

			var update = function() {
				if(options.type == 'normal'){
					motionMorph();
					motionGrid();
				}else if(options.type == 'morph'){
					motionMorph();
				}else if(options.type == 'grid'){
					motionGrid();
				}

				renderText(element);
			}

			function motionMorph() {
				snapStrength -= options.tick;

				if(snapStrength <= 0){
					snapStrength = 0;
					clearInterval(timer);
				}
			}

			function motionGrid() {
				snapDistance -= options.tick;
				if(snapDistance <= 1){
					snapDistance = 1;
					clearInterval(timer);
				}
			}

			parent.start = function() {
				snapStrength = options.snapStrength;
				snapDistance = options.snapDistance;
				clearInterval(timer);
				timer = setInterval(function(){ update(); }, options.tick);
			};

			parent.getTextWidth = function() {
				return font.getTextWidth();
			};
			
			parent.setPos = function(x, y) {
				options.x = x;
				options.y = y;
				renderText(element);
				parent.start();
			};

			opentype.load(options.fontFileName, function(error, font) {
    			onFontLoaded(font);
			});

			function onFontLoaded(f) {
    			font = f;
			 	if(options.textToRender == '') {
			 		options.textToRender = element.text();
			 	}
    			font.init(options.textToRender, options.fontSize, {kerning: options.kerning});
    			options.setPosition();
			}		

			function renderText(element) {
			    if (!font) return;
			    var textsnapgrid = element;
			    snapPath = font.getPath(options.textToRender, options.x, options.y, options.fontSize, {kerning: options.kerning});
			    doSnap(snapPath);
			    for(var i=0; i<textsnapgrid.length; i++){
				    var snapCtx = textsnapgrid[i].getContext('2d');    
				    snapCtx.clearRect(0, 0, textsnapgrid.width(), textsnapgrid.height());
				    snapPath.draw(snapCtx);
				}
			}

			function snap(v, distance, strength) {
			    return (v * (1.0 - strength)) + (strength * Math.round(v / distance) * distance);
			}

			function doSnap(path) {
			    var i;
			    var strength = snapStrength / 100.0;
			    for (i = 0; i < path.commands.length; i++) {
			        var cmd = path.commands[i];
			        if (cmd.type !== 'Z') {
			            cmd.x = snap(cmd.x + options.snapX, snapDistance, strength) - options.snapX;
			            cmd.y = snap(cmd.y + options.snapY, snapDistance, strength) - options.snapY;
			        }
			        if (cmd.type === 'Q' || cmd.type === 'C') {
			            cmd.x1 = snap(cmd.x1 + options.snapX, snapDistance, strength) - options.snapX;
			            cmd.y1 = snap(cmd.y1 + options.snapY, snapDistance, strength) - options.snapY;
			        }
			        if (cmd.type === 'C') {
			            cmd.x2 = snap(cmd.x2 + options.snapX, snapDistance, strength) - options.snapX;
			            cmd.y2 = snap(cmd.y2 + options.snapY, snapDistance, strength) - options.snapY;
			        }
			    }
			}



/*

function drawPointsChanged(e) {
    options.drawPoints = e.checked;
    renderText();
}

function drawMetricsChanged(e) {
    options.drawMetrics = e.checked;
    renderText();
}

function kerningChanged(e) {
    options.kerning = e.checked;
    renderText();
}

function fontSizeChanged() {
    options.fontSize = fontSizeSlider.value;
    document.getElementById('fontSize').innerHTML = '' + options.fontSize;
    renderText();
}

function snapStrengthChanged(e) {
    options.snapStrength = e.value;
    document.getElementById('snapStrength').innerHTML = '' + options.snapStrength;
    renderText();
}

function snapDistanceChanged(e) {
    options.snapDistance = e.value;
    document.getElementById('snapDistance').innerHTML = '' + options.snapDistance;
    renderText();
}

function snapXChanged(e) {
    options.snapX = e.value * 1.0;
    document.getElementById('snapX').innerHTML = '' + options.snapX;
    renderText();
}

function snapYChanged(e) {
    options.snapY = e.value * 1.0;
    document.getElementById('snapY').innerHTML = '' + options.snapY;
    renderText();
}

$("#font-size-range").on("input", function(){
    fontSizeChanged(this);
});


$("#snapStrengthInput").on("input", function(){
   snapStrengthChanged(this); 
});

$("#snapDistanceInput").on("input", function(){
    snapDistanceChanged(this);
});
*/

		});		

		return this;
	};
})(jQuery);