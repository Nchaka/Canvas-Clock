window.onload = init;

function init(){
	var canvas, ctx, radius, props;
	canvas = document.getElementById('clock');
	ctx = canvas.getContext('2d');
	radius = canvas.height / 2;
	ctx.translate(radius, radius);
	radius = radius * 0.9;
	props = {
		ctx: ctx,
		radius: radius,
		time: cTime()
	};
	clock(props);
};

function clock(p){
	setInterval(function(){
		p.time = cTime(); // Get the time
		body(p);
		face(p);
		cNumber(p);
		hourHand(p);
		minuteHand(p);
		secondHand(p);
	}, 1000);
};

function body(p){
	p.ctx.arc(
		0, // x
		0, // y
		p.radius, // Radius
		0, // Start angle
		2 * Math.PI // End angle
	);
	p.ctx.fillStyle = 'white';
	p.ctx.fill();
};

function face(p){
	innerContour(p);
	innerCircle(p);                
};

function innerContour(p){ // Inner contour
	p.ctx.beginPath();
	p.ctx.arc(
		0, // x
		0, // y
		p.radius * 0.95, // Radius
		0, // Start angle
		2 * Math.PI // End angle
	);
	p.ctx.fillStyle = '#eeeeee';
	p.ctx.fill();
};

function innerCircle(p){ // Inner Circle
	p.ctx.beginPath();
	p.ctx.arc(
		0, // x
		0, // y
		p.radius * 0.1, // Radius
		0, // Start angle
		2 * Math.PI // End angle
	);
	p.ctx.fillStyle = 'yellow';
	p.ctx.fill();
};

function cNumber(p){
	var ang, num;
	p.ctx.font = p.radius * 0.15 + 'px Arial';
	p.ctx.textBaseline = 'middle';
	p.ctx.textAlign = 'center';
	p.ctx.fillStyle = 'black';
	/* Calculate the print position 
	(for 12 numbers) to 85% of the radius, 
	rotated (PI/6) for each number */
	for(num = 1; num < 13; num ++){
		ang = num * Math.PI / 6;
		p.ctx.rotate(ang);
		p.ctx.translate(0, -p.radius * 0.85);
		p.ctx.rotate(-ang);
		p.ctx.fillText(num.toString(), 0, 0);
		p.ctx.rotate(ang);
		p.ctx.translate(0, p.radius * 0.85);
		p.ctx.rotate(-ang);
	};
};

function hands(p){
	p.ctx.beginPath();
	p.ctx.lineWidth = p.width;
	p.ctx.lineCap = 'round';
	p.ctx.moveTo(0, 0);
	p.ctx.rotate(p.pos);
	p.ctx.lineTo(0, -p.length);
	p.ctx.strokeStyle = p.color;
	p.ctx.stroke();
	p.ctx.rotate(-p.pos);
};

function hourHand(p){
	// Update hour hand properties
	p.pos = p.time.hour;
	p.length = p.radius * 0.5; // length
	p.width = p.radius * 0.1; // Width 
	p.color = 'green'; 
	hands(p); // Call the hour hand
};

function minuteHand(p){
	// Update the minute hand properties
	p.pos = p.time.minute;
	p.length = p.radius * 0.7;
	p.width = p.radius * 0.04;
	p.color = 'blue';             
	hands(p); // Call the minute hand
};

function secondHand(p){
	// Update the second hand properties
	p.pos = p.time.second;
	p.length = p.radius * 0.8;
	p.width = p.radius * 0.02;
	p.color = 'black';                
	hands(p); // Call the second hand
};

function cTime(){
	var now, hour, minute, second,
	hourlyR, minutelyR, secondlyR;
	now = new Date();
	hour = now.getHours();
	minute = now.getMinutes();
	second = now.getSeconds();
	hour = hour % 12;
	hourlyR = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
	minutelyR = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
	secondlyR = (second * Math.PI / 30);
	return {
		hour: hourlyR,
		minute: minutelyR,
		second: secondlyR
	};
};