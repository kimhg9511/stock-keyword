<template>
  <div id="svg">
  </div>
</template>

<script>
import * as d3 from "d3";
import * as keywords from "../../python_ws/rtop20_stocks20200707.json"
export default {
  name: 'app',
  data() {
    return {
      keywords: keywords.default,
    }
  },
  mounted() {
    this.generateWordNet()
  },
  methods: {
    generateWordNet(){
      let svgWidth = 500;
      let svgHeight = 500;
      let keywords = this.keywords;
      console.log(keywords)
      const svg = d3.select('#svg')
                      .append('svg')
                      .attr('width', svgWidth)
                      .attr('height', svgHeight)
                      .style('background-color', '#000')
      const g = svg.append('g')
          .selectAll('text')
          .data(keywords)
          .enter()
      const g2 = svg.append('g')
    }
  },
}
</script>

<style>

</style>