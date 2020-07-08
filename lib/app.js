$(function(){

  var options = {
    float: false,
    resizable: {
        handles: 'e, se, s, sw, w'
    },
    alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),    
    acceptWidgets: function(i, el) { return true; } ,
    scroll: true,
};

var grid =   GridStack.init(options, '.droppable-grid-stack');
var grid1 = GridStack.init(options, '.dragable-grid-stack');
$('.js-addWidget').click(function() {
    var el = $('<div class="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-width="4" data-gs-height="2"><div class="grid-stack-item-content ui-draggable-handle droppable"></div></div>');
    grid.addWidget(el, 0, 0, 4, 2, true);
});

var xaxis = 6 ;
$('.js-addchart').click(function() {
  var randomnum= Math.floor(Math.random() * 3) + 1;
  var divId = Math.random();
  var yaxi = 6 ;
  var el = $('<div class="grid-stack-item" data-gs-x="'+ xaxis +'" data-gs-y="0" data-gs-width="12" data-gs-height="3"><div class="grid-stack-item-content"><section class="panel"><div class="panel-body draggable"> <div id="myChart_' + divId + '"></div>  </div></section></div></div>');
         
  grid1.addWidget(el, 0, 0, 12, 3, true);
  xaxis  = xaxis +3;
  if(randomnum ==1){
    drawchart(divId);
  } 
  else{
    drawpiechart(divId)

  }
}
  );

$('.draggable').draggable({
  revert: 'invalid',
 handle: '.draggable',
  appendTo: '.grid-stack-item-content',
});

/* $(".draggable").draggable({
  cursor: "move",
  helper: 'clone',
  revert: 'invalid',
  
  appendTo: '.droppable',

}); */
/* 
$(".droppable").droppable({
  tolerance: "intersect",
  accept: ".draggable",
  activeClass: "ui-state-default",
  hoverClass: "ui-state-hover",
  drop: function(event, ui) {
    $(this).append($(ui.draggable));
  }
}); */


am4core.useTheme(am4themes_animated);

var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.colors.saturation = 0.4;

chart.data = [{
  "country": "USA",
  "visits": 3025
}, {
  "country": "China",
  "visits": 1882
}, {
  "country": "Japan",
  "visits": 1809
}, {
  "country": "Germany",
  "visits": 1322
}, {
  "country": "UK",
  "visits": 1122
}, {
  "country": "France",
  "visits": 1114
}, {
  "country": "India",
  "visits": 984
}, {
  "country": "Spain",
  "visits": 711
}, {
  "country": "Netherlands",
  "visits": 665
}, {
  "country": "Russia",
  "visits": 580
}, {
  "country": "South Korea",
  "visits": 443
}, {
  "country": "Canada",
  "visits": 441
}];


var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "country";
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.minWidth = 120;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.maxLabelPosition = 0.98;  

var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryY = "country";
series.dataFields.valueX = "visits";
series.tooltipText = "{valueX.value}";
series.sequencedInterpolation = true;
series.defaultState.transitionDuration = 1000;
series.sequencedInterpolationDelay = 100;
series.columns.template.strokeOpacity = 0;

chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "zoomY";

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
series.columns.template.adapter.add("fill", (fill, target) => {
  return chart.colors.getIndex(target.dataItem.index);
});


function drawchart (i) {
  var ctx = document.getElementById("myChart_" + i);

  am4core.useTheme(am4themes_animated);
  
  var chart = am4core.create(ctx, am4charts.XYChart);
  chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
  
  chart.colors.saturation = 0.4;
  
  chart.data = [{
    "country": "USA",
    "visits": 3025
  }, {
    "country": "China",
    "visits": 1882
  }, {
    "country": "Japan",
    "visits": 1809
  }, {
    "country": "Germany",
    "visits": 1322
  }, {
    "country": "UK",
    "visits": 1122
  }, {
    "country": "France",
    "visits": 1114
  }, {
    "country": "India",
    "visits": 984
  }, {
    "country": "Spain",
    "visits": 711
  }, {
    "country": "Netherlands",
    "visits": 665
  }, {
    "country": "Russia",
    "visits": 580
  }, {
    "country": "South Korea",
    "visits": 443
  }, {
    "country": "Canada",
    "visits": 441
  }];
  
  
  
  var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.dataFields.category = "country";
  categoryAxis.renderer.minGridDistance = 20;
  categoryAxis.renderer.minWidth = 120;
  
  var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.maxLabelPosition = 0.98;  
  
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.categoryY = "country";
  series.dataFields.valueX = "visits";
  series.tooltipText = "{valueX.value}";
  series.sequencedInterpolation = true;
  series.defaultState.transitionDuration = 1000;
  series.sequencedInterpolationDelay = 100;
  series.columns.template.strokeOpacity = 0;
  
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.behavior = "zoomY";
  
  // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
  series.columns.template.adapter.add("fill", (fill, target) => {
    return chart.colors.getIndex(target.dataItem.index);
  });
  
}


function drawpiechart(id){
  var ctx_piechart = document.getElementById("myChart_" + id);

  am4core.useTheme(am4themes_animated);

  var piechart = am4core.create(ctx_piechart, am4charts.PieChart);

  // Add data
  piechart.data = [{
    "country": "Lithuania",
    "litres": 501.9
  }, {
    "country": "Czech Republic",
    "litres": 301.9
  }, {
    "country": "Ireland",
    "litres": 201.1
  }, {
    "country": "Germany",
    "litres": 165.8
  }, {
    "country": "Australia",
    "litres": 139.9
  }, {
    "country": "Austria",
    "litres": 128.3
  }, {
    "country": "UK",
    "litres": 99
  }, {
    "country": "Belgium",
    "litres": 60
  }, {
    "country": "The Netherlands",
    "litres": 50
  }];
  
  // Add and configure Series
  var pieSeries = piechart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "litres";
  pieSeries.dataFields.category = "country";
 
}
var piechart = am4core.create("piechart", am4charts.PieChart);

// Add data
piechart.data = [{
  "country": "Lithuania",
  "litres": 501.9
}, {
  "country": "Czech Republic",
  "litres": 301.9
}, {
  "country": "Ireland",
  "litres": 201.1
}, {
  "country": "Germany",
  "litres": 165.8
}, {
  "country": "Australia",
  "litres": 139.9
}, {
  "country": "Austria",
  "litres": 128.3
}, {
  "country": "UK",
  "litres": 99
}, {
  "country": "Belgium",
  "litres": 60
}, {
  "country": "The Netherlands",
  "litres": 50
}];

// Add and configure Series
var pieSeries = piechart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";

});