(function(global) {

function getEdge(itemColor, rotateX, rotateY, rotateZ) {
	var size = 70,
		posX = -1 * size,
		posY =  -1 * size,
		items = [];

	for(var i = 0; i < 9; i++) {
		items.push({
			pos : {
				x : posX,
				y : posY,
				z : size * 1.5
			},
			rotate : {
				x : rotateX,
				y : rotateY,
				z : rotateZ
			},
			color : itemColor,
			scope : size
		});

		posX += size;

		if (posX > size) {
			posX = -1 * size;
			posY += size;
		}
	}

	return items;
}

global.cube = {
	front  : getEdge('rgb(190, 12, 45)',   0,   0, 0),
	back   : getEdge('rgb(255, 146, 0)',   0, 180, 180),
	bot    : getEdge('rgb(235, 235, 235)', -90,   0, 0),
	top    : getEdge('rgb(244, 220, 16)',  90,   0, 0),
	left   : getEdge('rgb(50, 90, 190)',   0, -90, -90),
	right  : getEdge('#4CAF50', 0, 90, 90)
};

var environment = document.getElementsByClassName('environment')[0].style,
	edges = Object.keys(cube);

for(var i = 0; i < edges.length; i++) { 
	var edgeName = edges[i],
		envSize = 0;

	for(var j = 0; j < 9; j++) {
		var ctx = document.getElementsByClassName(edgeName)[j].style,
			edgeObj  = cube[edges[i]][j],
			transform = '';

		ctx.backgroundColor = edgeObj.color;

		transform += 'rotateX(' + edgeObj.rotate.x + 'deg)';
		transform += 'rotateY(' + edgeObj.rotate.y + 'deg)'; 
		transform += 'rotateZ(' + edgeObj.rotate.z + 'deg)';  
		transform += 'translateZ(' + edgeObj.pos.z + 'px)';
		transform += 'translateX(' + edgeObj.pos.x + 'px)';
		transform += 'translateY(' + edgeObj.pos.y + 'px)';	
		ctx.transform = transform;

		ctx.width = edgeObj.scope + 'px';
		ctx.height = edgeObj.scope + 'px';
		ctx.border = edgeObj.scope/20 + 'px solid #292929';
		envSize += edgeObj.scope;
	}

	environment.width = envSize;
	environment.height = envSize;
}

})(this);