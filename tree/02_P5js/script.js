function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);

	// noLoop();
}

function draw() {
	background(200);

	randomSeed(1);

	translate(0, 200, 0);

	rotateY(frameCount);

	branch(100);
}

function branch(len) {
	strokeWeight(map(len, 10, 100, 0.5, 5));
	stroke(70, 40, 20);

	line(0, 0, 0, 0, -len, -2);

	translate(0, -len, 0);

	if (len > 10) {
		for (let i = 0; i < 3; i++) {
			rotateY(random(100, 140));

			push();

			rotateZ(random(20, 50));
			branch(len * 0.6);

			pop();
		}
	} else {
		let r = 120 + random(-20, 20);
		let g = 60 + random(-20, 20);
		let b = 180 + random(-20, 20);

		fill(r, g, b, 200);
		noStroke();

		translate(5, 0, 0);

		rotateZ(90);

		beginShape();
		for (let i = 45; i < 135; i++) {
			let rad = 7;
			let x = rad * cos(i);
			let y = rad * sin(i);
			vertex(x, y);
		}
		for (let i = 135; i > 45; i--) {
			let rad = 7;
			let x = rad * cos(i);
			var y = rad * sin(-i) + 10;
			vertex(x, y);
		}
		endShape(CLOSE);
	}
}
