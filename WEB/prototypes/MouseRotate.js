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

cubeDomElem.addEventListener('touchstart', function(e) {
	lastDown = e;
});

cubeDomElem.addEventListener('touchend', function(e) {	
	if (!lastDown) return;
	var target = lastDown.target,
		edgeName = target.className,
		itemOnEdgePos = items.indexOf(target),
		horDir = e.x - lastDown.x > 0 ? 'Right' : 'Left',
		verDir = e.y - lastDown.y > 0 ? 'Down' : 'Top';

	methods[edgeName + horDir + 'Rotate']();

	lastDown = null;
});
