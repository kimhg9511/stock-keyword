<template>
  <div id='arc'>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      gdp: [
        {country: "USA", value: 20.5 },
        {country: "China", value: 13.4 },
        {country: "Germany", value: 4.0 },
        {country: "Japan", value: 4.9 },
        {country: "France", value: 2.8 }
      ],
      childData: [
        10, 20, 30, 40, 50
      ]
    };
  },
  mounted() {
    this.generateArc();``
  },
  methods: {
    generateArc() {
      // 데이터 가공, 변수 선언
      const svgWidth = 500;
      const svgHeight = 500;
      const sortedGDP = this.gdp.sort((a, b) => (a.value > b.value ? 1 : -1));
      const sGdpValues = sortedGDP.map(d => d['value']);
      const sumGDP = this.gdp.map(d => d['value']).reduce((a,b)=>a+b)
      const sumTest = this.childData.reduce((a,b) => a+b)
      const color = d3.scaleOrdinal(d3.schemeDark2);
      // <svg> element 생성
      const svg = d3
        .select("#arc")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

      // 스케일 설정 (실제 값 <-> 화면에 보여지기 위한 값)
      const angleScale = d3
        .scaleLinear()
        .domain([0, sumGDP])
        .range([0, 2 * Math.PI]);
      
      const childAngleScale = d3
        .scaleLinear()
        .domain([0, sumTest])
        .range([angleScale(sGdpValues.slice(0,4).reduce((a,b)=> a+b)), angleScale(sGdpValues.slice(0,5).reduce((a,b)=> a+b))]);

      const arc = d3
        .arc()
        .innerRadius(50)
        .outerRadius(150)
        .startAngle((d,i) => i != 0 ? angleScale(sGdpValues.slice(0,i).reduce((a,b)=> a+b)) : 0)
        .endAngle((d,i) => angleScale(sGdpValues.slice(0,i+1).reduce((a,b)=> a+b)));

      const childArc = d3
        .arc()
        .innerRadius(150)
        .outerRadius(250)
        .startAngle((d,i) => i != 0 ? childAngleScale(this.childData.slice(0,i).reduce((a,b)=>a+b)) : angleScale(sGdpValues.slice(0,4).reduce((a,b)=>a+b)))
        .endAngle((d,i) => childAngleScale(this.childData.slice(0,i+1).reduce((a,b)=> a+b)));


      const g = svg.append("g");
      g.selectAll("path")
        .data(sortedGDP)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .attr("stroke", "#fff")
        .attr("stroke-width", "2px")
        .on("mouseenter", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("opacity", 0.5);
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("opacity", 1);
        });

      const g2 = svg.append("g");
      g2.selectAll("path")
        .data(this.childData)
        .enter()
        .append("path")
        .attr("d", childArc)
        .attr("fill", (d, i) => color(i))
        .attr("stroke", "#fff")
        .attr("stroke-width", "2px")

      g.attr("transform", `translate(${svgWidth/2},${svgHeight/2})`);
      g2.attr("transform", `translate(${svgWidth/2},${svgHeight/2})`);
    }
  }
}
</script>

<style>

</style>