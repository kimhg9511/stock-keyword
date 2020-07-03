# d3.js 기반 word cloud 만들기

## d3-cloud 모듈 다운로드

## svg 생성

## cloud layout 생성

```javascript
var layout = cloud()
    .size([width, height])
    .words(this.fruits.map(function(d) { return {text: d}; }))
    .padding(5)        
    .rotate(0)       
    .fontSize(fontSize)     
    .on("end", draw);
layout.start();
```



## 실제 그리기

```javascript
function draw(words) {
        svg
          .append("g")
            .attr("transform",`translate(${layout.size()		[0]/2},${layout.size()[1]/2})`)
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
```



## 실행 결과

