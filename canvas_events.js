
function mouseCanvas(e){
	//e.preventDefault();
	x = e.pageX - e.target.offsetLeft;
	y = e.pageY - e.target.offsetTop;
	current.state = 0;
	//console.log('Click at: ',x,y);
	handleClick(x,y);
}

function touchCanvas(e){
	e.preventDefault();
	x = e.changedTouches[0].pageX - e.target.offsetLeft;
	y = e.changedTouches[0].pageY - e.target.offsetTop;
	//current.state = 0;
	handleClick(x,y);
}

/*-----------------------------------------*/

function mouseMove(e){
	console.log('Moving');
	if (e.which === 1){
		// Left Button Pressed
		mouseCanvas(e);
	}
}

function stopHover(e){
	current.state = 1;
	//console.log('Stopped hovering', hoverCol, hoverRow, prevCell);
	//current.grid[hoverCol][hoverRow] = 0;
	//current.grid[hoverCol][hoverRow] = prevCell;
	
	//current.path = plotPath(current.grid,current.start,current.end);

	window.requestAnimationFrame(mainLoop);
	
}