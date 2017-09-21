const btn = document.querySelector("button");
const svg = d3.selectAll("svg");
const data = [
	{ tag: "henry" },
	{ tag: "betty" },
	{ tag: "martha" },
	{ tag: "erin" }
];
const circle = svg.selectAll("circle").data(data);
//exiting here helps to dynamically update the page if you enter in new data
// it essentially clears out the unused data, if there is any living in the
//three states of enter, update, exit.
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
//had to build an array containing the cirlces created, so I could grab
// their x & y locations below.
circleArr.forEach((elm, ind, arr) => {
	circleXY.push([
		circleArr[ind].cx.baseVal.value,
		circleArr[ind].cy.baseVal.value
	]);
});

console.log(circleXY);
// I then use the x & y circle locations to update the location of the text
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
	//this is how you add text into SVG text element. Notice that d is the data
	//connected at the top to the circles. It's an object, so d.tag gives the name
	.text((d, i) => {
		return d.tag;
	});
