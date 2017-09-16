const btn = document.querySelector("button");
const svg = d3.selectAll("svg");
const data = [
	{ tag: "henry" },
	{ tag: "betty" },
	{ tag: "martha" },
	{ tag: "erin" }
];
const circle = svg.selectAll("circle").data(data);
circle.exit().remove();
circle
	.enter()
	.append("circle")
	.attr("r", 50)
	.merge(circle)
	.attr("cx", function(d, i) {
		return (i + 1) * 150;
	})
	.attr("cy", 100);

const circleArr = document.body.querySelector("svg").querySelectorAll("circle");
const circleXY = [];
console.log(circleArr[0].cx.baseVal.value);
circleArr.forEach((elm, ind, arr) => {
	circleXY.push([
		circleArr[ind].cx.baseVal.value,
		circleArr[ind].cy.baseVal.value
	]);
});

console.log(circleXY);
circle
	.enter()
	.append("text")
	.attr("x", function(d, i) {
		return String(circleXY[i][0]);
	})
	.attr("y", (d, i) => {
		return String(circleXY[i][1]);
	})
	.attr("fill", "white")
	.attr("text-anchor", "middle")
	.text((d, i) => {
		return d.tag;
	});
