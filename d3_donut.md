# d3.js 기반 계층구조 도넛 차트

## Vue.js component 기본 구조

```vue
<template>
	<div id="svg">
    <!-- html 영역 -->
    </div>
</template>

<script>
export default {
	<!-- javascript 영역 -->
}
</script>

<style>
	<!-- css 영역 -->
</style>
```

## Inputed data

```javascript
export default {
  data() {
    return {
      // 1층(안쪽) 도넛을 그릴 데이터입니다.
      gdp: [
        {country: "USA", value: 20.5 },
        {country: "China", value: 13.4 },
        {country: "Germany", value: 4.0 },
        {country: "Japan", value: 4.9 },
        {country: "France", value: 2.8 }
      ],
      // 2층(바깥쪽) 도넛을 그릴 데이터입니다.
      childData: [
        10, 20, 30, 40, 50
      ]
    };
  },
  ...
```

## svg element 생성

```javascript
// <svg> element 생성
const svg = d3
    .select("#arc")	
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
```

d3는 작업의 대부분을 메소드 체인을 통하여 처리합니다. 즉, 메소드(함수)가 꼬리에 꼬리를 무는 형태로 작성됩니다.

물론 두 개 이상의 작업을 동시에 처리할때에는 체인을 끊고 변수에 저장하여 해당 변수에서 메소드 체인을 이어나가시면 됩니다.

위 코드는 id가 arc인 요소(element)를 선택하여 하위에 svg 요소를 생성하고, 그 속성으로 width와 height를 주고 있습니다. 그리고 그 반환값을 svg에 저장했습니다.

렌더링이 끝난 결과는

```
<div id="arc">
	<svg width="**svgWidth의 값" height="**svgHeight의 값">
	</svg>
</div>
```

가 될 것입니다.

svg는 웹에서 반응형 이미지를 그리기 위한 도화지라고 생각하시면 편합니다.

자세한 내용이 궁금하시다면 

[https://ko.wikipedia.org/wiki/%EC%8A%A4%EC%BC%80%EC%9D%BC%EB%9F%AC%EB%B8%94_%EB%B2%A1%ED%84%B0_%EA%B7%B8%EB%9E%98%ED%94%BD%EC%8A%A4](https://ko.wikipedia.org/wiki/스케일러블_벡터_그래픽스)

해당 링크 혹은 구글에 svg로 검색해서 찾아보시길 권장합니다.

d3.js(이하 d3라고 칭함)는 svg 기반의 프레임워크이므로 svg의 속성을 아는것이 중요합니다.

## 스케일 설정

```javascript
// 스케일 설정 (실제 값 <-> 화면에 보여지기 위한 값)
const angleScale = d3
    .scaleLinear()
    .domain([0, sumGDP])
    .range([0, 2 * Math.PI]);
```

실제 데이터 수치 그대로를 시각화하려면 많은 애로사항이 있습니다. 웹 브라우저의 기본 단위는 px(픽셀)이며 이 값은 대체로 480px ~ 1980px 해상도에서 표시되기 때문입니다.  

d3에서는 이를 scale을 이용하여 실제 데이터의 범위(domain)과 자신이 시각화할 영역의 범위(range)를 입력하여 scale 메소드를 생성할 수 있습니다. 만약

domain : 0 ~ 10000

range : 0 ~ 100

이라면 scale(9000)의 값은 90을 반환합니다.

## 도넛 그리기

```javascript
const arc = d3
    .arc()
    .innerRadius(50)
    .outerRadius(150)
    .startAngle((d,i) => i != 0 ? angleScale(sGdpValues.slice(0,i).reduce((a,b)=> a+b)) : 0)
    .endAngle((d,i) => angleScale(sGdpValues.slice(0,i+1).reduce((a,b)=> a+b)));
```

실제로 차트를 그리는 코드입니다. inner,outer Radius는 이름에서 알 수 있듯 내부 반지름, 외부 반지름을 뜻합니다. 중심부 기준에서 얼마나 멀어지는지 입니다.







