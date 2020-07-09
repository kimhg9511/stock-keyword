<template>
  <div id="text-cloud">
  </div>
</template>
<script>
import * as d3 from "d3";
import * as cloud from "d3-cloud";
import * as keywords from "../../python_ws/rtop20_stocks20200707.json"
export default {
  name: 'app',
  data() {
    return { 
      keywords : keywords.default,
    }
  },
  mounted() {
    this.generateCloud(this.keywords, 'archimedean');
    this.generateCloud(this.keywords, 'rectangular');
  },
  methods: {
    generateCloud(keywords, spiral){
      let mainKeywords = Object.keys(keywords);
      let counts = mainKeywords.map(elem => keywords[elem]['count']);
      let cMax = counts.reduce((a,b) => a > b ? a : b);
      let cMin = counts.reduce((a,b) => a > b ? b : a);
      let fontSize = 20;
      let fontMax = 2;
      let fontMin = 1;
      const fontSizeScale = d3.scaleLinear()
                            .domain([cMin, cMax])
                            .range([fontMin, fontMax])
      let width = 800;
      let height = 300;
      let colors = ["#111","#333","#555","#777","#999"]
      let svg = d3.select("#text-cloud").append("svg")
          .attr('width', width)
          .attr('height', height);
          
      let layout = cloud()
        .size([width, height])
        .words(mainKeywords.map(function(d) { return {text: d}; }))
        .padding(0)
        .rotate(0)
        .text(d => d.text)        
        .font('Impact')     
        .fontSize(fontSize* fontMax)
        .spiral(spiral)
        .on("end", draw);
      layout.start();
      let generateBox = this.generateBox;

      function draw(words) {
        let g = svg.append("g")
          .attr("transform",`translate(${layout.size()[0]/2},${layout.size()[1]/2})`)
          .selectAll("text")
          .data(words)
          .enter()
        g.append("text")
          .text(d => d.text)
          .style("font-family", "Impact")
          .style("fill", (d,i) => colors[i%colors.length])
          .attr("text-anchor", "middle")
          .style("cursor", "pointer")
          .style("font-weight", "bold")
          .style("font-size", d => {
            return fontSize * fontSizeScale(keywords[d.text]['count']);
          })
          .on('mouseover', d => {
            generateBox(keywords[d.text]['count']);
            console.dir()
          })
          .transition()
          .duration(600)
          .delay((d, i) => i * 20)
          .attr("transform", d => 
            `translate(${[d.x, d.y]})rotate(${d.rotate})`
          );
      }

    },
    generateBox(text){
      console.log(text);
      console.dir(this)
    },
  }
}
</script>

<style>

</style>