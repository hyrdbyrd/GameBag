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

		for(let i = 0; i < 3; i++){
			temp = colors.top[8 - i];
			colors.top[8 - i] = colors.left[8 - i];
			colors.left[8 - i] = colors.bot[i];
			colors.bot[i] = colors.right[8 - i];
			colors.right[8 - i] = temp;
		}

		update();
	},

	frontLeftRotate: function() {
		methods.frontRightRotate();
		methods.frontRightRotate();
		methods.frontRightRotate();
	},

	leftRightRotate: function() {

		face(colors.left);

		for(let i = 0; i < 3; i++){
			temp = colors.front[i*3];
			colors.front[i*3] = colors.top[i*3];
			colors.top[i*3] = colors.back[i*3];
			colors.back[i*3] = colors.bot[i*3];
			colors.bot[i*3] = temp;
		}

		update();
	},

	leftLeftRotate: function() {
		methods.leftRightRotate();
		methods.leftRightRotate();
		methods.leftRightRotate();
	},

	rightRightRotate: function() {

		face(colors.right);

		for(let i = 0; i < 3; i++){
			temp = colors.bot[2 + i*3];
			colors.bot[2 + i*3] = colors.back[2 + i*3];
			colors.back[2 + i*3] = colors.top[2 + i*3];
			colors.top[2 + i*3] = colors.front[2 + i*3];
			colors.front[2 + i*3] = temp;
		}

		update();
	},

	rightLeftRotate: function () {
		methods.rightRightRotate();
		methods.rightRightRotate();
		methods.rightRightRotate();
	},

	topRightRotate: function() {

		face(colors.top);

		for(let i = 0; i < 3; i++){
			temp = colors.front[i];
			colors.front[i] = colors.right[6 - 3*i];
			colors.right[6 - 3*i] = colors.back[8 - i];
			colors.back[8 - i] = colors.left[2 + 3*i];
			colors.left[2 + 3*i] = temp;
		}

		update();
	},

	topLeftRotate: function() {
		methods.topRightRotate();
		methods.topRightRotate();
		methods.topRightRotate();
	},

	botRightRotate: function() {

		face(colors.bot);

		for(let i = 0; i < 3; i++){
			temp = colors.front[i + 6];
			colors.front[i + 6] = colors.left[i*3];
			colors.left[i*3] = colors.back[2 - i];
			colors.back[2 - i] = colors.right[8 - 3*i];
			colors.right[8 - 3*i] = temp;
		}

		update();
	},

	botLeftRotate: function() {
		methods.botRightRotate();
		methods.botRightRotate();
		methods.botRightRotate();
	},

	backRightRotate: function() {

		face(colors.back);

		for(let i = 0; i < 3; i++){
			temp = colors.right[i];
			colors.right[i] = colors.bot[i + 6];
			colors.bot[i + 6] = colors.left[i];
			colors.left[i] = colors.top[i];
			colors.top[i] = temp;
		}

		update();
	},

	backLeftRotate: function() {
		methods.backRightRotate();
		methods.backRightRotate();
		methods.backRightRotate();
	},

	rotateAll: function(e){
		var downInterval,
			lastDown = 0;

		cubeDomElem.addEventListener('mousedown', function(e){
			onDown = e;
			e.stopImmediatePropagation();
		});

		cubeDomElem.addEventListener('mouseup', function(e) {	
			var target = lastDown.target,
				xDir = e.x - onDown.x,
				yDir = e.y - onDown.y;
			cubeDomElem.style.transform = 'rotateX(' + yDir + 'deg) rotateY(' + xDir + 'deg)';
			e.stopImmediatePropagation();
		});	
	},

	middleTopRightRotate: function(){
		methods.topRightRotate();
		methods.botLeftRotate();
	},

	middleTopLeftRotate: function(){
		methods.middleTopRightRotate();
		methods.middleTopRightRotate();
		methods.middleTopRightRotate();
	},

	middleLeftRightRotate: function(){
		methods.leftLeftRotate();
		methods.rightRightRotate();
	},

	middleLeftLeftRotate: function(){
		methods.middleLeftRightRotate();
		methods.middleLeftRightRotate();
		methods.middleLeftRightRotate();
	},

	middleFrontRightRotate: function(){
		methods.frontLeftRotate();
		methods.backRightRotate();
	},

	middleFrontLeftRotate: function(){
		methods.middleFrontRightRotate();
		methods.middleFrontRightRotate();
		methods.middleFrontRightRotate();
	},

	reload: function(){
		for(key in colors){
			colors[key].forEach((item, i, arr) => {
				arr[i] = arr[4];
			});
		}
		update();
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
	animation();
}

document.querySelectorAll('.tap').forEach(button => {
	var methodName = button.getAttribute('data-click');
	button.addEventListener('click', methods[methodName]);
});

var items = Array.prototype.slice.call(cubeDomElem.querySelectorAll('div')),
	lastDown;

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