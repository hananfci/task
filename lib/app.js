$(function(){

/* local variables */
  var options = {
    float: false,
    resizable: {
        handles: 'e, se, s, sw, w'
    },
    alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),    
    acceptWidgets: function(i, el) { return true; } ,
    scroll: true,
};
var serializedData;

/* bind tow gridstack */
var grid =   GridStack.init(options, '.droppable-grid-stack');
var chartgrid = GridStack.init(options, '.dragable-grid-stack');
/* this ecent I coded if person want to add widget dashboard when clcik on button */
$('.js-addWidget').click(function() {
  addwidgetdashboard();
});

/* add widget in dashboard gridstack */
function addwidgetdashboard(){
  var el = $('<div class="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-width="2" data-gs-height="2"><div class="grid-stack-item-content ui-draggable-handle droppable"></div></div>');
  grid.addWidget(el, 0, 0, 2, 2, true);
}

/* add widget in chart  gridstack */
var xaxis = 6 ;
$('#addchart').click(function() {
  var randomnum= Math.floor(Math.random() * 3) + 1;
  var divId = Math.random();
  var el = $('<div class="grid-stack-item" data-gs-x="'+ xaxis +'" data-gs-y="0" data-gs-width="12" data-gs-height="3"><div class="grid-stack-item-content"><section class="panel"><div class="panel-body draggable"> <div id="myChart_' + divId + '"></div>  </div></section></div></div>');
         
  chartgrid.addWidget(el, 0, 0, 12, 3, true);
  xaxis  = xaxis +3;
  if(randomnum == 1){
    drawchart(divId);
  } 
  else{
    drawpiechart(divId)

  }
});
 
/* draggablet chart into  dashboard gridstack */
$('.draggable').draggable({
  revert: 'invalid',
 handle: '.draggable',
  appendTo: '.grid-stack-item-content',
});



/* function to draw  linechart */

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

/* function to draw  piechart  */
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

addwidgetdashboard();

/* function to save dashboard widget */
saveGrid = function() {
  serializedData =[];
  debugger
  $('.droppable-grid-stack .grid-stack-item.ui-draggable').each(function () {
    var $this = $(this); 
    serializedData.push({
      x: $this.attr('data-gs-x'),
      y: $this.attr('data-gs-y'),
      width:$this.attr('data-gs-width'),
      height: $this.attr('data-gs-height'),
      content: $('.grid-stack-item-content', this).html()
    });
  });

/*   $.cookie("grid-layout", JSON.stringify(serializedData));
  console.log ($.cookie("grid-layout")); */

  localStorage.setItem("grid-layout-dash", JSON.stringify(serializedData));
  $('#lblsave').removeClass('displaynone')
}

/* function to load  dashboard widget */
loadGrid = function () {              
debugger
  var items =GridStack.Utils.sort(JSON.parse(localStorage.getItem('grid-layout-dash') )) 
  //grid.batchUpdate();
  grid.removeAll();
   items.forEach( function(item) {   
    var el =  '<div class="grid-stack-item"><div class="grid-stack-item-content">' + item.content + '</div></div>'
    console.log("content",item.content )

    // grid.update(el, item.x, item.y, item.width, item.height) ; //this not worked with me
    grid.addWidget(el, item.x, item.y, item.width, item.height) ;   

   }); 
   
//grid.commit();//and this also
}

/* function to resposive gridstack widget */
function resizeGrid() {
  var width = document.body.clientWidth;
  if (width < 700) {
    grid.column(1);
  } else if (width < 850) {
    grid.column(3);
  } else if (width < 950) {
    grid.column(6);
  } else if (width < 1100) {
    grid.column(8);
  } else {
    grid.column(12);
  }
};

resizeGrid();
window.addEventListener('resize', function() {resizeGrid()});

/* static chart if you want to load page with to static chart */


});