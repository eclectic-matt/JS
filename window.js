// https://andylangton.co.uk/blog/development/get-viewportwindow-size-width-and-height-javascript
function viewport() {
	var e = window, a = 'inner';
	if ( !( 'innerWidth' in window ) ){
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

function resizeCanvas(){
	
	var c = document.getElementById('canvas');
	
	scr_wid = viewport().width;
	scr_hgt = viewport().height;
	if (scr_wid >= scr_hgt || scr_wid >= 600){
		// Landscape
		var cnv_pad = options.canvas_padding;
		var hgt_fact = 0.75;
		var wid_fact = 0.45;
		c.width = c.height = Math.min( (scr_wid * wid_fact) - (2 * cnv_pad), (hgt_fact * scr_hgt) - (10 * cnv_pad));
	}else{
		// Portrait
		//cnv_pad = Math.max(options.canvas_padding, scr_wid / 10);
		var cnv_pad = scr_wid / 10; //options.canvas_padding;
		c.width = c.height = scr_wid - (2 * cnv_pad);
	}
	current.width = c.width;
	current.height = c.height;

	current.cell_width = current.width / current.columns;
	current.cell_height = current.height / current.rows;
	
	spawn_point = {};
	if (current.path.length !== 0){	
		spawn_point.x = current.cell_width * current.path[0][1] + (current.cell_width / 2);
		spawn_point.y = current.cell_height * current.path[0][0] + (current.cell_height / 2);
	}
	
	if (current.grid.length !== 0){
		var ctx = c.getContext('2d');
		clearCanvas(ctx);
		draw_map(ctx);
	}
	
	// TO ADD - RECALCULATE ENEMY AND BULLET POSITIONS ON RESIZE (INSTANT)
}