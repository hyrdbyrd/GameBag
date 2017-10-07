(function(cube) {

var cubeDomElem = document.getElementById('cube'),
	colorNames = ['front', 'left', 'right', 'bot', 'top', 'back'],
	colors = colorNames.reduce((acc, edgeName) => {
		acc[edgeName] = [];

		for (let i = 0; i < 9; i++) {
			acc[edgeName].push(cube[edgeName][i].color);
		}

		return acc;
		
	}, {});

function face(edge) {
	var temp = edge[0];
	edge[0] = edge[6];
	edge[6] = edge[8];
	edge[8] = edge[2];
	edge[2] = temp;

	temp = edge[1];
	edge[1] = edge[3];
	edge[3] = edge[7];
	edge[7] = edge[5];
	edge[5] = temp;
}

var methods = {
	_rotateFlag: false,
	cubeRotate: function() {
		this._rotateFlag = !this._rotateFlag;

		if (this._rotateFlag) {
			cubeDomElem.style.transform  = 'rotateY(-126deg)';
			cubeDomElem.style.transform += 'rotateX(24deg)';
			cubeDomElem.style.transform +=  'rotateZ(-61deg)';
			return;
		}

		cubeDomElem.style.transform  = 'rotateX(-36deg)';
		cubeDomElem.style.transform += 'rotateY(45deg)';
		cubeDomElem.style.transform += 'rotateZ(0deg)';
	},

	frontRightRotate: function() {

		face(colors.front);

		temp = colors.right[0];
		colors.right[0] = colors.top[6];
		colors.top[6] = colors.left[8];
		colors.left[8] = colors.bot[2];
		colors.bot[2] = temp;

		temp = colors.right[3];
		colors.right[3] = colors.top[7];
		colors.top[7] = colors.left[5];
		colors.left[5] = colors.bot[1];
		colors.bot[1] = temp;

		temp = colors.right[6];
		colors.right[6] = colors.top[8];
		colors.top[8] = colors.left[2];
		colors.left[2] = colors.bot[0];
		colors.bot[0] = temp;

		update();
	},

	frontLeftRotate: function() {
		methods.frontRightRotate();
		methods.frontRightRotate();
		methods.frontRightRotate();
	},

	leftRightRotate: function() {

		face(colors.left);

		temp = colors.front[0];
		colors.front[0] = colors.top[0];
		colors.top[0] = colors.back[8];
		colors.back[8] = colors.bot[0];
		colors.bot[0] = temp;

		temp = colors.front[3];
		colors.front[3] = colors.top[3];
		colors.top[3] = colors.back[5];
		colors.back[5] = colors.bot[3];
		colors.bot[3] = temp;

		temp = colors.front[6];
		colors.front[6] = colors.top[6];
		colors.top[6] = colors.back[2];
		colors.back[2] = colors.bot[6];
		colors.bot[6] = temp;

		update();
	},

	leftLeftRotate: function() {
		methods.leftRightRotate();
		methods.leftRightRotate();
		methods.leftRightRotate();
	},

	rightRightRotate: function() {

		face(colors.right);

		temp = colors.front[2];
		colors.front[2] = colors.bot[2];
		colors.bot[2] = colors.back[6];
		colors.back[6] = colors.top[2];
		colors.top[2] = temp;

		temp = colors.front[5];
		colors.front[5] = colors.bot[5];
		colors.bot[5] = colors.back[3];
		colors.back[3] = colors.top[5];
		colors.top[5] = temp;

		temp = colors.front[8];
		colors.front[8] = colors.bot[8];
		colors.bot[8] = colors.back[0];
		colors.back[0] = colors.top[8];
		colors.top[8] = temp;

		update();
	},

	rightLeftRotate: function () {
		methods.rightRightRotate();
		methods.rightRightRotate();
		methods.rightRightRotate();
	},

	topRightRotate: function() {

		face(colors.top);

		temp = colors.front[0];
		colors.front[0] = colors.right[0];
		colors.right[0] = colors.back[0];
		colors.back[0] = colors.left[0];
		colors.left[0] = temp;

		temp = colors.front[1];
		colors.front[1] = colors.right[1];
		colors.right[1] = colors.back[1];
		colors.back[1] = colors.left[1];
		colors.left[1] = temp;

		temp = colors.front[2];
		colors.front[2] = colors.right[2];
		colors.right[2] = colors.back[2];
		colors.back[2] = colors.left[2];
		colors.left[2] = temp;

		update();
	},

	topLeftRotate: function() {
		methods.topRightRotate();
		methods.topRightRotate();
		methods.topRightRotate();
	},

	botRightRotate: function() {

		face(colors.bot);

		temp = colors.front[6];
		colors.front[6] = colors.left[6];
		colors.left[6] = colors.back[6];
		colors.back[6] = colors.right[6];
		colors.right[6] = temp;

		temp = colors.front[7];
		colors.front[7] = colors.left[7];
		colors.left[7] = colors.back[7];
		colors.back[7] = colors.right[7];
		colors.right[7] = temp;

		temp = colors.front[8];
		colors.front[8] = colors.left[8];
		colors.left[8] = colors.back[8];
		colors.back[8] = colors.right[8];
		colors.right[8] = temp;

		update();
	},

	botLeftRotate: function() {
		methods.botRightRotate();
		methods.botRightRotate();
		methods.botRightRotate();
	},

	backRightRotate: function() {

		face(colors.back);

		temp = colors.right[8];
		colors.right[8] = colors.bot[6];
		colors.bot[6] = colors.left[0];
		colors.left[0] = colors.top[2];
		colors.top[2] = temp;

		temp = colors.right[5];
		colors.right[5] = colors.bot[7];
		colors.bot[7] = colors.left[3];
		colors.left[3] = colors.top[1];
		colors.top[1] = temp;

		temp = colors.right[2];
		colors.right[2] = colors.bot[8];
		colors.bot[8] = colors.left[6];
		colors.left[6] = colors.top[0];
		colors.top[0] = temp;

		update();
	},

	backLeftRotate: function() {
		methods.backRightRotate();
		methods.backRightRotate();
		methods.backRightRotate();
	}
}


var edges = colorNames.map(color => colors[color]);

function update(){
	for (var i = 0; i < edges.length; i++) {
		var edgeName = edges[i],
			itemName = colorNames[i];

		for (var j = 0; j < edgeName.length; j++) {
			var ctx = document.getElementsByClassName(itemName)[j].style;
			ctx.backgroundColor = edgeName[j];
		}
	}

	animRotate();
}

function animRotate(){
	// for(var i = 0; i < edges.length; i++){
	// 	var edgeName = edges[i],
	// 		itemName = edgeClass[i];
	// 	for(var j = 0; j < edgeName.length; j++){
	// 		var ctx = document.getElementsByClassName(itemName)[j].style;
	// 		ctx.backgroundColor = edgeName[j];
	// 	}
	// }
}

document.querySelectorAll('.tap').forEach(button => {
	var methodName = button.getAttribute('data-click');

	button.addEventListener('click', methods[methodName]);
});

var items = Array.prototype.slice.call(cubeDomElem.querySelectorAll('div'));

// items.forEach(item => {
// 	item.addEventListener('click', function(e) {
// 		var target = e.target,
// 			edgeName = target.className,
// 			itemOnEdgePos = items.indexOf(target);
		
// 		methods[edgeName + 'LeftRotate']();
// 	});
// });


var lastDown;

cubeDomElem.ondragstart = function() {
	return false;
};

cubeDomElem.addEventListener('mousedown', function(e) {
	lastDown = e;
});

cubeDomElem.addEventListener('mouseup', function(e) {	
	if (!lastDown) return;

	var target = lastDown.target,
		edgeName = target.className,
		itemOnEdgePos = items.indexOf(target),
		horDir = e.x - lastDown.x > 0 ? 'Right' : 'Left',
		verDir = e.y - lastDown.y > 0 ? 'Down' : 'Top';

	methods[edgeName + horDir + 'Rotate']();

	lastDown = null;
});

})(cube);