
var hitslineChart = dc.lineChart("#chart-line-hitsperday","viz"); 
var srcChart = dc.rowChart("#dc-depth-chart","viz");
var dstChart = dc.rowChart("#dc-magnitude-chart","viz");



            d3.json("http://localhost:1990/api/v1/log/10000000", function (data) {
                // format the data a bit
                var numberFormat = d3.format(",f");
                var dateformat=d3.time.format("dd.mm.yyyy hh:MM:ss").parse;            
                data.forEach(function(d) {
                	d.date = new Date(parseInt(d.timestamp_1));
                    year = d.date.getFullYear(),
                	 month = d.date.getMonth() + 1, // months are zero indexed
                     day = d.date.getDate(),
                     hour = d.date.getHours(),
                     minute = d.date.getMinutes(),
                     second = d.date.getSeconds(),
                     d.date= month + "/" + day + "/" + year + " " + hour + ":" +minute;
                });
                
                // feed it through crossfilter
                
            var ndx = crossfilter(data); 
                var parseDate = d3.time.format("%x %H:%M").parse;
            data.forEach(function(d) {
		d.date = parseDate(d.date);
		d.total= d.cnt;
	    });
            var dateDim = ndx.dimension(function(d) {return d.date;});
            var hits = dateDim.group().reduceSum(function(d) {return d.total;});
            var minDate = dateDim.bottom(1)[0].date;
            var maxDate = dateDim.top(1)[0].date;
            var dtgFormat2 = d3.time.format("%a %e %b %H:%M");
          
            
            hitslineChart.width(1500)
    	    .height(200)
    	    .margins({top: 10, right: 20, bottom: 60, left: 80})
    	    .dimension(dateDim)
    	    .group(hits)
    	    .transitionDuration(500)
        .title(function(d){ 
        	return dtgFormat2(d.data.key)
            + "\nNumber of Events: " + d.data.value;
          })
    	    .elasticY(true)
    	    .xUnits(d3.time.hours)
    	    .x(d3.time.scale().domain([d3.time.hour.offset(minDate, -1), d3.time.hour.offset(maxDate, 2)]))
    	    .xAxis();
    	    
            
            var expensesByFunction = ndx.dimension(function (d) {
                return d.srcaddr_s;
            });
            var dstexpensesByFunction = ndx.dimension(function (d) {
                return d.dstaddr_s;
            });
            
            var expensesByFunctionGroup = expensesByFunction.group().reduceSum(function (d) { return d.cnt; });
            var dstexpensesByFunctionGroup = dstexpensesByFunction.group().reduceSum(function (d) { return d.cnt; });

            function getTops(source_group) {
                return {
                    all: function () {
                        return source_group.top(10);
                    }
                };
            }
            var fakeGroup = getTops(expensesByFunctionGroup);
            var dstfakeGroup = getTops(dstexpensesByFunctionGroup);
           
            var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function (d) { return "<span style='color: #f0027f'>" +  d.key + "</span> : "  + numberFormat(d.value); });

	   
        var expenseColors = ["#fde0dd","#fa9fb5","#e7e1ef","#d4b9da","#c994c7","#fcc5c0","#df65b0","#e7298a","#ce1256", "#f768a1","#dd3497","#e78ac3","#f1b6da","#c51b7d"];

        srcChart.width(300)
        .height(500)
        .margins({top: 20, left: 40, right: 40, bottom: 20})
        .transitionDuration(750)
        .dimension(expensesByFunction)
        .title(function(d){ 
    	return d.data.key
        + "\nNumber of hits: " + d.data.value;
      })
        .group(fakeGroup)
        .colors(expenseColors)
        .renderLabel(true)
        .gap(9)
        .title(function (d) { return ""; })
        .elasticX(true)
        .xAxis().ticks(5).tickFormat(d3.format("s"));
     
        dstChart.width(300)
        .height(500)
        .margins({top: 20, left: 40, right: 40, bottom: 20})
        .transitionDuration(750)
        .dimension(dstexpensesByFunction)
         .title(function(d){ 
    	return d.data.key
        + "\nNumber of hits: " + d.data.value;
      })
        .group(dstfakeGroup)
        .colors(expenseColors)
        .renderLabel(true)
        .gap(9)
        .title(function (d) { return ""; })
        .elasticX(true)
        .xAxis().ticks(5).tickFormat(d3.format("s"));
        
	    
	    dc.renderAll("viz");
	    d3.selectAll("g.x text")
        .attr("class", "campusLabel")
        .style("text-anchor", "end") 
        .attr("transform", "translate(-10,0)rotate(315)");

    d3.selectAll("g.row").call(tip);
    d3.selectAll("g.row").on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    d3.selectAll(".pie-slice").call(pieTip);
    d3.selectAll(".pie-slice").on('mouseover', pieTip.show)
        .on('mouseout', pieTip.hide);

    d3.selectAll(".bar").call(barTip);
    d3.selectAll(".bar").on('mouseover', barTip.show)
        .on('mouseout', barTip.hide); 
console.log(minDate);
console.log(minDate.getHours);
});