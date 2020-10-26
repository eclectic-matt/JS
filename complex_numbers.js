function Complex(real, imaginary) {
  this.real = real;
  this.imaginary = imaginary;
}

Complex.prototype.print = function() {

	let sign = '';

	if (this.imaginary > 0){
		sign = '+';
	}

  return this.real + " " + sign + ' ' + this.imaginary + "i";
};

Complex.prototype.add = function(c2){
	var r = this.real + c2.real;
	var i = this.imaginary + c2.imaginary;
	return new Complex(r, i);
}

Complex.prototype.sub = function(c2){
	var r = this.real - c2.real;
	var i = this.imaginary - c2.imaginary;
	return new Complex(r,i);
}

Complex.prototype.multiply = function(c2){
	var r = (this.real * c2.real) - (this.imaginary * c2.imaginary);
	var i = (this.real * c2.imaginary) + (c2.real * this.imaginary);
	return new Complex(r, i);
}

Complex.prototype.divide = function(c2){
	var rA = (this.real * c2.real) + (this.imaginary * c2.imaginary);
	var i = (this.imaginary * c2.real) - (this.real * c2.imaginary);
	var rB = (c2.real * c2.real) + (c2.imaginary * c2.imaginary);
	return new Complex(rA / rB, i / rB);
}

Complex.prototype.modulo = function(){
	var r = (this.real * this.real) + (this.imaginary * this.imaginary)
	return Math.sqrt(r);
}
