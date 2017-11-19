(function(){
    var cube = document.querySelector('#cube'),
        edgeClasses = [
            'front',
            'back',
            'right',
            'left',
            'top',
            'bot'
        ],
        items = [];
 
    for(var i = 0; i < edgeClasses.length; i++){
        for(var j = 0; j < 9; j++){
            items.push('<div class="' + edgeClasses[i] + '"></div>');
        }
    }

    cube.innerHTML = items.join('');
})();