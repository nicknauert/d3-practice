const combinedData = mergeData();
const width = 700,
	height = 700;
const firstFile = combinedData[0];
var svg = d3
	.select("body")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

console.log(firstFile);

let nodes = [firstFile];
let links = [{ source: firstFile.d3, target: firstFile.d3, distance: 100 }];

firstFile.tags.forEach(tag => {
	tag.d3 = "t" + tag.tag_id;
	nodes.push(tag);
	links.push({ source: tag.d3, target: firstFile.d3, distance: 100 });
});

console.log(nodes);
console.log(links);

function mergeData() {
	const data = [];
	files.forEach((file, ind) => {
		file.d3 = "f" + file.file_id;
		console.log(file.d3);
		const tagArray = tags.filter(tag => {
			return tag.file_id === file.file_id;
		});
		const combinedInfo = {
			file_id: file.file_id,
			d3: file.d3,
			file_name: file.file_name,
			tags: tagArray
		};
		data.push(combinedInfo);
	});
	return data;
}

function nodeSize(d) {
	if (d.d3.indexOf("f") > -1) {
		return 50;
	} else {
		return 25;
	}
}

function fillColor(d) {
	if (d.d3.indexOf("f") > -1) {
		return "blue";
	} else {
		return "red";
	}
}

//===============================================================
const simulation = d3.forceSimulation().nodes(nodes);

simulation
	.force("charge_force", d3.forceManyBody().strength(-10000))
	.force("center_force", d3.forceCenter(width / 2, height / 2));

const node = svg
	.append("g")
	.attr("class", "nodes")
	.selectAll("circle")
	.data(nodes)
	.enter()
	.append("circle")
	.attr("r", nodeSize)
	.attr("fill", fillColor);

function tickActions() {
	//update circle positions to reflect node updates on each tick of the simulation
	node
		.attr("cx", function(d) {
			return d.x;
		})
		.attr("cy", function(d) {
			return d.y;
		});
}

simulation.on("tick", tickActions);

var link_force = d3.forceLink(links).id(function(d) {
	console.log(d);
	return d.d3;
});

simulation.force("links", link_force);

var link = svg
	.append("g")
	.attr("class", "links")
	.selectAll("line")
	.data(links)
	.enter()
	.append("line")
	.attr("stroke-width", 2);

const text = svg
	.append("g")
	.attr("class", "text")
	.selectAll("text")
	.data(nodes)
	.enter()
	.append("text")
	.attr("fill", "white")
	.attr("text-anchor", "middle")
	.text(d => {
		if (d.file_name) {
			return d.file_name;
		}
		return d.tag_name;
	});

function tickActions() {
	//update circle positions each tick of the simulation
	node
		.attr("cx", function(d) {
			return d.x;
		})
		.attr("cy", function(d) {
			return d.y;
		});

	//update link positions
	//simply tells one end of the line to follow one node around
	//and the other end of the line to follow the other node around
	link
		.attr("x1", function(d) {
			return d.source.x;
		})
		.attr("y1", function(d) {
			return d.source.y;
		})
		.attr("x2", function(d) {
			return d.target.x;
		})
		.attr("y2", function(d) {
			return d.target.y;
		});

	text
		.attr("x", function(d) {
			return d.x;
		})
		.attr("y", function(d) {
			return d.y;
		});
}
