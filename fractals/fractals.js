const CNV_WIDTH = 800;
const CNV_HEIGHT = 600;
const COL_MAX = 255;
const ITERATIONS = 100;
const LIMIT = 2;
const HEX_MAX = 65535;
const RANGE = 4;

var xMin = -2;
var yMin = -2;
var zoomLevel = 1;


function complexTests(){

  document.getElementById('spanZoom').innerHTML = zoomLevel;
	  let tStart = performance.now();
	generateMandlebrot(xMin, yMin, ITERATIONS, LIMIT);
	  let tEnd = performance.now();
	  console.log('Time taken: '+ (tEnd - tStart) +' milliseconds');

}

function increaseZoom(){
  zoomLevel++;
  xMin *= 0.5;
  yMin *= 0.5;
  complexTests();
}

function decreaseZoom(){
  if (zoomLevel === 1){ return false }
  zoomLevel--;
  xMin *= 2;
  yMin *= 2;
  complexTests();
}

function scrollToLeft(){
  xMin -= 0.5;
  complexTests();
}

function scrollRight(){
  xMin += 0.5;
  complexTests();
}

function scrollUp(){
  yMin -= 0.5;
  complexTests();
}

function scrollDown(){
  yMin += 0.5;
  complexTests();
}


// Process for each point (x,y)
// Make this a complex coordinate, c = x + yi
// Run this through the formula f(z) = z^2 + c
// Start with z = 0 for the first iteration, then z = f(z)
// Take the modulo of the result at each iteration
// If this is > 2 then break out - not in the set!
// If this is < 2 then this IS in the set!
// The colour for the point (x,y) is the number of iterations before it broke out
// Black -> never breaks out

// RETURN THE NUMBER OF ITERATIONS IT TOOK TO BREAK FROM THE LIMIT
function mandlebrot(x, y, iterations, limit){

	let c = new Complex(x, y);
	let z = new Complex(0, 0);
	let count = 0;

	for (let i = 0; i < iterations; i++){

		// MANDLEBROT Z^2 - 1
		// First, do Z^2
		let zSqr = z.multiply(z);
		// Then finish formula
		let cResult = zSqr.sub(c);
		let cMod = cResult.modulo();
		// Check if this is above the limit
		if (cMod >= limit){
			break;
		}else{
			// Feed this back into the formula!
			z = cResult;
			count++;
		}

	}

	return count;
}

function generateMandlebrot(x0, y0, iterations, limit){

  let xRange = RANGE / zoomLevel;
  let yRange = RANGE / zoomLevel;

	// Setup x and y values (assume square graph)
  /*
	let xMax = Math.abs(x0);
	let yMax = Math.abs(y0);
  let xInc = (2 * xMax) / CNV_WIDTH;
  let yInc = (2 * yMax) / CNV_HEIGHT;
  */

  // Zoom and scroll-based
  let xMax = x0 + xRange;
  let yMax = y0 + yRange;
  let xInc = (xRange / CNV_WIDTH);
  let yInc = (yRange / CNV_HEIGHT);
  console.log('Range X/Y = ',xRange,yRange);
  console.log('x0/y0 = ',x0,y0);
  console.log('xMax/yMax = ',xMax,yMax);
  console.log('xInc/yInc = ',xInc,yInc);

	// Setup canvas
	let cnv = document.getElementById('fractalCnv');
	cnv.width = CNV_WIDTH;
	cnv.height = CNV_HEIGHT;
	let ctx = cnv.getContext('2d', { alpha: false });

	let xCoord = 0;
	for (var x = x0; x < xMax; x = x + xInc){

		let yCoord = 0;

		for (var y = y0; y < yMax; y = y + yInc){

			let i = mandlebrot(x, y, iterations, limit);
      ctx.moveTo(xCoord, yCoord);

      // USING RGB
			let col = Math.floor(COL_MAX * (i / iterations));
			//ctx.fillStyle = 'rgb(0, 0, ' + col + ')';
      ctx.fillStyle = 'rgb(0, ' + col + ', 0)';

      // USING HSL
      //let hue = Math.floor(360 * (i / iterations));
      //let hue = Math.floor(HEX_MAX * (i / iterations)).toString(16);
      //let light = (i < ITERATIONS) ? '100%' : '0%';
      //ctx.fillStyle = 'hsl(' + hue + ', 100%, ' + light + ')';
			ctx.fillRect(xCoord, yCoord, 1, 1);

			//console.log('Point (' + x + ',' + y + ') iterations = ' + i);

			yCoord++;

		}

		xCoord++;

	}

  ctx.fill();


}
