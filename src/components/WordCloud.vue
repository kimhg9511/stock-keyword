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
        {'name' : '사과',  'count': 3},
        {'name' : '바나나', 'count': 2},
        {'name' : '포도',  'count': 1},
        {'name' : '키위',   'count': 3},
        {'name' : '메론',  'count': 2},
        {'name' : '오렌지',  'count': 1},
        {'name' : '수박', 'count': 3},
        {'name' : '귤',  'count': 2},
        {'name' : '과일',   'count': 1},
        {'name' : '참외',  'count': 3},
        {'name' : '복숭아',  'count': 2},
        {'name' : 'ㅎㅎ', 'count': 1},
        {'name' : '겹침',  'count': 3},
        {'name' : '해결이', 'count': 2},
        {'name' : '안됨',  'count': 1},
        {'name' : '사과',  'count': 3},
        {'name' : '바나나', 'count': 2},
        {'name' : '포도',  'count': 1},
        {'name' : '키위',   'count': 3},
        {'name' : '메론',  'count': 2},
        {'name' : '오렌지',  'count': 1},
        {'name' : '수박', 'count': 3},
        {'name' : '귤',  'count': 2},
        {'name' : '과일',   'count': 1},
        {'name' : '참외',  'count': 3},
        {'name' : '복숭아',  'count': 2},
        {'name' : 'ㅎㅎ', 'count': 1},
        {'name' : '겹침',  'count': 3},
        {'name' : '해결이', 'count': 2},
        {'name' : '안됨',  'count': 1},
      ]
    }
  },
  mounted() {
    this.generateCloud();
  },
  methods: {
    generateCloud(){
      let width = 450;
      let height = 450;
      let fontSize = 14;
      let fruits = this.fruits;
      let colors = ["#111","#333","#555","#777","#999"]
      let svg = d3.select("#text-cloud").append("svg")
          .attr('width', width)
          .attr('height', height);
          
      let layout = cloud()
        .size([width, height])
        .words(fruits.map(function(d) { return {text: d['name']}; }))
        .padding(0)
        .rotate(0)
        .text(d => d.text)        
        .font('Impact')     
        .fontSize(fontSize*3)
        .on("end", draw);
      layout.start();

      function draw(words) {
        svg.append("g")
          .attr("transform",`translate(${layout.size()[0]/2},${layout.size()[1]/2})`)
          .selectAll("text")
          .data(words)
          .enter().append("text")
            .style("font-family", "Impact")
            .style("fill", (d,i) => colors[i%colors.length])
            .attr("text-anchor", "middle")
            .style("cursor", "pointer")
            .style("font-weight", "bold")
            .style("font-size", (d, i) => {
              return fontSize * fruits[i]['count'];
            })
            .attr("transform", d => 
              `translate(${[d.x, d.y]})rotate(${d.rotate})`
            )
            .text(d => d.text)

      }
    },
  }
}
</script>

<style>

</style>