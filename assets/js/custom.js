$(function() {
	$(".push_menu").click(function(){
         $(".wrapper").toggleClass("active");
    });

	// Pie Chart for Trending
    new Chartist.Pie('#trending-chart-one', {
    	labels: ['20%', 'Womens'],
	  	series: [20, 80]
	}, {
		donut: true,
		donutWidth: 20
	});

    // Pie Chart for Trending
	new Chartist.Pie('#trending-chart-two', {
    	labels: ['40%', 'Mens'],
	  	series: [40, 60]
	}, {
		donut: true,
		donutWidth: 20
	});

	// Bar Chart for Sales
	new Chartist.Bar('#sales-chart', {
	  	labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	  	series: [
	  	  	[5, 4, 3, 7, 5, 10],
    		[3, 2, 9, 5, 4, 6]
	  	]
	}, {
		seriesBarDistance: 15,
		reverseData: true,
		horizontalBars: true,
		stackBars: true,
		axisX: {
		    labelInterpolationFnc: function(value) {
			    return value.split(/\s+/).map(function(word) {
			      	return word[0];
			    }).join('');
		    },
		    onlyInteger: true
		},
		axisY: {
			offset: 70
		}
	}, [
		// Options override for media > 400px
		['screen and (min-width: 400px)', {
		    reverseData: true,
		    horizontalBars: true,
		    axisX: {
		    	labelInterpolationFnc: Chartist.noop,
		    },
		    axisY: {
		    	offset: 60
		    }
		}],
		// Options override for media > 800px
		['screen and (min-width: 800px)', {
		    stackBars: true,
		    seriesBarDistance: 10
		}],
		// Options override for media > 1000px
		['screen and (min-width: 1000px)', {
		    reverseData: true,
		    horizontalBars: true,
		    stackBars: false,
		    seriesBarDistance: 15
		}]
	]);

	var visits_chart = new Chartist.Line('#visits-chart', {
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		series: [
		    [1, 5, 2, 5, 4, 3],
		    [2, 3, 4, 8, 1, 2]
		]
	}, {
		low: 0,
		showArea: true,
		showPoint: false,
		fullWidth: true,
		axisY: {
	    	onlyInteger: true
	    }
	});

	visits_chart.on('draw', function(data) {
		if(data.type === 'line' || data.type === 'area') {
		    data.element.animate({
			    d: {
			        begin: 2000 * data.index,
			        dur: 2000,
			        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
			        to: data.path.clone().stringify(),
			        easing: Chartist.Svg.Easing.easeOutQuint
			    }
		    });
		}
	});
});