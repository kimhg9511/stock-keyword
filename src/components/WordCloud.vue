<template>
  <div id="text-cloud">
  </div>
</template>
<script>
import * as d3 from "d3";
import * as cloud from "d3-cloud";
export default {
  name: 'app',
  data() {
    return { 
      fruits: [
        'apple',
        'banana',
        'grape',
        'kiwi',
        'melon',
        'apple',
        'banana',
        'grape',
        'kiwi',
        'melon',
        'apple',
        'banana',
        'grape',
        'kiwi',
        'melon'
      ] 
    }
  },
  mounted() {
    this.generateCloud();
  },
  methods: {
    generateCloud(){
      // var margin = {top: 10, right: 10, bottom: 10, left: 10},
          // width = 450 - margin.left - margin.right,
          // height = 450 - margin.top - margin.bottom;
          let width = 450;
          let height = 450;
          let fontSize = 36;
      var svg = d3.select("#text-cloud").append("svg")
          // .attr("width", width + margin.left + margin.right)
          // .attr("height", height + margin.top + margin.bottom)
          .attr('width', 450)
          .attr('height', 450);
        // .append("g")
        //   .attr("transform",
        //         "translate(" + margin.left + "," + margin.top + ")");
      var layout = cloud()
        .size([width, height])
        .words(this.fruits.map(function(d) { return {text: d}; }))
        .padding(5)        
        .rotate(0)       
        .fontSize(fontSize)     
        .on("end", draw);
      layout.start();

      function draw(words) {
        svg
          .append("g")
            .attr("transform",`translate(${layout.size()[0]/2},${layout.size()[1]/2})`)
            .selectAll("text")
              .data(words)
            .enter().append("text")
              .style("font-size", fontSize)
              .style("fill", "#333")
              .attr("text-anchor", "middle")
              .style("font-family", "Impact")
              .attr("transform", d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
              .text(d => d.text)
      }
    },
  }
}
</script>

<style>

</style>