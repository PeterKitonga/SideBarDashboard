$(".push_menu").click(function(){
    $(".wrapper").toggleClass("active");
});

$('[data-toggle="tooltip"]').tooltip();

custom = {
	initCharts: function() {
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
	},

	initDatatables: function() {
		var table = $('#custom-datatable').DataTable({
			processing: true,
			order: [[ 1, 'asc' ]],
			dom: '<"row"<"col-md-6"B><"custom-filter col-md-6"f>>rtip',
			deferRender: true,
            orderClasses: false,
            responsive: true,
            buttons: [
            	{
            		extend: 'pageLength', 
            		className: 'btn-default'
            	},
	            {
	                text: 'Custom Button One',
	                className: 'btn-default',
	                action: function (e, dt, node, config) {
	                    table.state.clear();
	                	window.location.reload();
	                }
	            },
	            {
	                text: 'Custom Button Two',
	                className: 'btn-default',
	                action: function (e, dt, node, config) {
	                    table.state.clear();
	                	window.location.reload();
	                }
	            }
	        ],
	        responsive: {
                details: {
                    type: 'column'
                }
            },
            columnDefs: [
	            {
		            className: 'control',
		            orderable: false,
		            targets:   0
		        }
	        ],
		});

		$('div.custom-filter').html('' +
            '<div class="row">' +
                '<div class="col-sm-4">' +
                    '<div class="dropdown category-dropdown pull-right"> ' +
                        '<a href="#" class="btn btn-default dropdown-toggle category-text" data-toggle="dropdown">First Name ' +
                            '<b class="caret"></b> ' +
                        '</a> ' +
                        '<ul class="dropdown-menu dropdown-menu-left"> ' +
                            '<li><a href="#" class="category-selection" data-name="first-name" data-node="1">First Name</a></li> ' +
                            '<li class="divider"></li> ' +
                            '<li><a href="#" class="category-selection" data-name="last-name" data-node="2">Last Name</a></li> ' +
                            '<li class="divider"></li> ' +
                            '<li><a href="#" class="category-selection" data-name="position" data-node="3">Position</a></li> ' +
                            '<li class="divider"></li> ' +
                            '<li><a href="#" class="category-selection" data-name="office" data-node="4">Office</a></li> ' +
                            '<li class="divider"></li> ' +
                            '<li><a href="#" class="category-selection" data-name="age" data-node="5">Age</a></li> ' +
                            '<li class="divider"></li> ' +
                            '<li><a href="#" class="category-selection" data-name="start-date" data-node="6">Start Date</a></li> ' +
                            '<li class="divider"></li> ' +
                            '<li><a href="#" class="category-selection" data-name="salary" data-node="7">Salary</a></li> ' +
                            '<li class="divider"></li> ' +
                            '<li><a href="#" class="category-selection" data-name="extn" data-node="8">Extn</a></li> ' +
                        '</ul> ' +
                    '</div>' +
                '</div>' +
                '<div class="col-sm-6">' +
                    '<form class="form-inline pull-right" id="search-form">' +
                        '<div class="form-group custom-search-input-form-group">' +
                            '<input type="text" class="form-control custom-search-input" name="phone" placeholder="Enter First Name" data-node="1">' +
                        '</div>' +
                    '</form>' +
                '</div>' +
                '<div class="col-sm-2">' +
                    '<button type="button" class="btn btn-default pull-left reset-table-button" data-toggle="tooltip" data-placement="left" title="Reset table">' +
                    	'<i class="fa fa-undo"></i>' +
                    '</button>' +
                '</div>' +
            '</div>'
        );

		$('.category-selection').on('click', function (e) {
                e.preventDefault();
                var text = $(this).text();
                var name = $(this).attr('data-name');
                var node = $(this).attr('data-node');
                $('.category-dropdown').find('.category-text').html(text+' <b class="caret"></b> ');
                $('.form-inline').find('.custom-search-input').attr('name', name)
                    .end()
                    .find('.custom-search-input').attr('placeholder', 'Enter '+text)
                    .end()
                    .find('.custom-search-input').attr('data-node', node);
            });

		$('input.custom-search-input').on('keyup click', function () {
			var i = $(this).attr('data-node');
			var value = $(this).val();
	        table.column(i).search(value).draw();
	    });

	    $('.reset-table-button').on('click', function() {
            table.state.clear();
            window.location.reload();
        });
	}, 

	initForms: function() {
		$('#editor').summernote({
			placeholder: 'Comments go here...'
		});

		$('#datetimepicker').datetimepicker({
			format: 'L'
		});

		$('#timepicker').datetimepicker({
            format: 'LT'
        });
	}
}