

jQuery(function($){
    var ts1 = $('.textsnapgrid1').textsnapgrid({
        fontFileName: 'fonts/OpenSansRegular.ttf', 
        fontSize: 90,
        tick: 0.7,
        setPosition: function() {
            var x = $('.textsnapgrid1').width()/2 - this.parent.getTextWidth()/2;
            this.parent.setPos(x, 200);
        }
    }); 

    var ts2 = $('.textsnapgrid2').textsnapgrid({
        fontFileName: 'fonts/LCALLIG.ttf',
        fontSize: 80,
        tick: 0.7,
        type: 'morph',
        setPosition: function() {
            var x = $('.textsnapgrid2').width()/2 - this.parent.getTextWidth()/2;     
            this.parent.setPos(x, 200);
        }
    });

    var ts3 = $('.textsnapgrid3').textsnapgrid({
        fontFileName: 'fonts/rmtyperighter.ttf',
        fontSize: 190,
        tick: 0.7,
        type: 'grid',
        setPosition: function() {
            var x = $('.textsnapgrid3').width()/2 - this.parent.getTextWidth()/2;     
            this.parent.setPos(x, 200);
        }
    });

     var ts4 = $('.textsnapgrid4').textsnapgrid({
        fontFileName: 'fonts/minecraftregular.ttf',
        fontSize: 80,
        tick: 0.7,
        setPosition: function() {
            var x = $('.textsnapgrid4').width()/2 - this.parent.getTextWidth()/2;     
            this.parent.setPos(x, 200);
        }
    });

	ts1.on('mouseover', function(event){
		ts1.start();
	});

	ts2.on('mouseover', function(event){
		ts2.start();
	});

	ts3.on('mouseover', function(event){
		ts3.start();
	});

	ts4.on('mouseover', function(event){
		ts4.start();
	});

});