var nodes = [
{"id": 1, "name": "You should have your teenager drive a manual", "size": 120, "url":"images/manualgear.jpg"},
{"id": 2, "name": "It is Safer", "size": 80, "url": "images/safety.jpg"},
{"id": 3, "name": "It saves you Money", "size": 60, "url": "images/money.jpg"},
{"id": 4, "name": "It is more fun for the Teen", "size": 48 , "url": "images/fun.png"},
{"id": 5, "name": "It can be hard to drive", "size":68, "url": "images/hard.jpg"},
{"id": 6, "name": "It is a Unique Skill", "size": 40, "website":"unique.html", "url": "images/unique.jpg"},
{"id": 7, "name": "It keeps you aware", "size": 40, "website":"aware.html", "url": "images/aware.jpg"},
{"id": 8, "name": "Initial Costs", "size": 40, "website":"initial.html", "url": "images/initial.jpg"},
{"id": 9, "name": "Maintenance", "size": 40, "website":"maintanance.html", "url": "images/maint.png"},
{"id": 10, "name": "Gas Money", "size": 40, "website":"gas.html", "url": "images/gas.jpg"},
{"id": 11, "name": "Overseas", "size": 40, "website":"overseas.html", "url": "images/overseas.jpg"},
{"id": 12, "name": "Offroad", "size": 40, "website":"offroad.html", "url": "images/offroad.jpg"},
{"id": 13, "name": "\"But it is Too Hard\"", "size": 40, "website":"hard.html", "url": "images/tooHard.jpg"},
{"id": 14, "name": "Hill Starts", "size": 40, "website":"hill.html", "url":"images/hillstart.jpg"},
{"id":15, "name":"Works Cited", "size": 60, "website":"works.html", "url":"images/workscited.jpg"}
];

var links = [ {"source": 0, "target": 1},
{"source": 0, "target": 2},{"source": 0, "target": 3},{"source": 0, "target": 14},
{"source": 0, "target": 4},{"source": 1, "target": 5},
{"source": 1, "target": 6},{"source": 2, "target": 7},
{"source": 2, "target": 8},{"source": 2, "target": 9},
{"source": 3, "target": 10},{"source": 3, "target": 11},
{"source": 4, "target": 12},{"source": 4, "target": 13}]
;
var url = "https://i2.wp.com/campuseye.ug/wp-content/uploads/2016/04/manual.jpg?zoom=2&resize=599%2C359";

function build(){


  var width = 1000;
  var height = 1000;

  var canvas = d3.select("body").append("svg").attr("width", width).attr("height",height);


  canvas.selectAll(".patterns")
        .data(nodes)
        .enter()
        .append("pattern")
        .attr("id", function(d){return "image"+ d.id})
        .attr("x", "0%")
        .attr("y", "0%")
        .attr("height", "100%")
        .attr("width", "100%")
        //.attr("viewBox", "0 0 30 30")
        .append("image")
        .attr("xlink:href",
        function(d){
          console.log(d.url);
          return d.url
        })
        .attr("x", function(d){return -(d.size / 2)})
        .attr("y", function(d){return -(d.size / 2)})
        .attr("height", function(d){return d.size * 3})
        .attr("width", function(d){return d.size * 3});

  var sim = d3.forceSimulation()
      .force("link", d3.forceLink())
      .force("charge", d3.forceManyBody().strength(-500).distanceMin(0))
      .force("center",d3.forceCenter(width/2,height/2))
      .force("collide",d3.forceCollide().iterations(3))
      .alphaTarget(1).on("tick", ticked);

  var link = canvas.attr("class","links")
        .selectAll(".line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke","#D3D3D3")
        .attr("stroke-width", "10px");

  var node = canvas.attr("class","circle")
            .selectAll(".circle")
            .data(nodes)
            .enter()
          //  .append("image").attr("xlink:href","images/decline.png")
            //.attr("height", 50)
            //.attr("width", 50)
            .append("circle")
            //.attr("xlink:href", function(d){return d.url})
            .attr("fill", function(d){
              //console.log(n);
              return "url(#image"+ d.id+ ")"})
            //.attr("x",  -50)
            //.attr("y",  -50)
            //.attr("width", "100px")
            //.attr("height","100px")
            //.attr("clip-path", "url(#clipCircle)")
            .attr("r",function(d){return (d.size );})
            .attr("stroke","#2378ae")
            .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
            //.on("mouseover",getBigger)
            //.on("mouseout",getSmaller)
            .on("click",setWebsite);


  function setWebsite(d){

    var h1 = document.getElementById("website");
    if(d.website == null){
      h1.innerHTML = "Topic: " + d.name + "<br>" +"Go To Website: "
    }else{
      h1.innerHTML = "Topic: " + d.name + "<br>" +"Go To Website: " + "<a href="+d.website +">"+d.name+"<a>"
    }

    document.body.scrollTop = 30; // For Safari
    document.documentElement.scrollTop = 250;
  }

  function getSmaller(d){
    if(d.website !=null){
      d3.select(this).attr("r", function(d){return (d.size )});
    }
  }

  function getBigger(d){
    if(d.website != null){
      d3.select(this).attr("r", function(d){return (d.size+ 10)});
    }
  }

   var label = canvas.append("g").attr("class","text")
         .selectAll(".text")
         .data(nodes)
         .enter()
         .append("text")
         .attr("dx",0)
         .attr("dy",50)
         .attr("font-size",40);




  sim.nodes(nodes);

  sim.force("link").links(links).distance(180);

  function ticked(){
     node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    //label.attr("dx", function(d) { return d.x; })
      //  .attr("dy", function(d) { return d.y; });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });



  }

  function dragstarted(d) {
    if (!d3.event.active) sim.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) sim.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}
