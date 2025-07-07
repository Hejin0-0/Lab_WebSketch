import { Circle } from './circle.js'; // Circle 클래스를 circle.js 파일에서 가져와서 사용할 수 있도록 import

class App {
	constructor() {
		this.canvas = document.createElement("canvas"); // HTML canvas 요소를 생성해서 그래픽을 그릴 수 있는 영역을 만듦
		this.ctx = this.canvas.getContext("2d"); // 2D 그래픽 컨텍스트를 가져와서 캔버스에 그리기 작업을 할 수 있도록 함
		document.body.appendChild(this.canvas); // 생성한 캔버스를 HTML 문서의 body에 추가해서 화면에 표시

		// 설정값들
		this.circleSpeed = 0.4; // 원의 이동 속도를 0.4로 설정해서 원들이 천천히 움직이도록 함
		this.circleStrokeColor = "white"; // 원의 테두리 색상을 흰색으로 설정해서 원의 경계를 명확히 보이도록 함
		this.intersectionFillColor = "#666677"; // 교차점의 내부 색상을 회색으로 설정해서 교차점을 구별할 수 있도록 함
		this.intersectionStrokeColor = "white"; // 교차점의 테두리 색상을 흰색으로 설정해서 교차점 경계를 명확히 함

		window.addEventListener("resize", this.resize.bind(this), false); // 브라우저 창 크기가 변경될 때 resize 메서드를 호출하도록 이벤트 리스너를 등록
		this.resize(); // 초기 설정을 위해 resize 메서드를 호출해서 캔버스 크기와 원들을 생성
		requestAnimationFrame(this.animate.bind(this)); // 애니메이션 프레임을 요청해서 animate 메서드를 반복 호출하도록 함
	}

	resize() {
		// 캔버스 크기 설정
		this.stageWidth = this.canvas.width = innerWidth; // 브라우저 창의 너비를 가져와서 캔버스 너비와 스테이지 너비로 설정
		this.stageHeight = this.canvas.height = innerHeight; // 브라우저 창의 높이를 가져와서 캔버스 높이와 스테이지 높이로 설정

		// 캔버스 배경색 랜덤 지정
		this.canvas.style.background = `hsla(${Math.random() * 360}, 70%, 50%, 1)`; // 0-360도 사이의 랜덤한 색상으로 배경색을 설정해서 매번 다른 색상의 배경을 보여줌

		// 원 생성 관련 변수 계산
		let biggerSide = Math.max(this.stageWidth, this.stageHeight); // 스테이지의 너비와 높이 중 더 큰 값을 구해서 화면 비율을 계산하는데 사용
		let smallerSide = Math.min(this.stageWidth, this.stageHeight); // 스테이지의 너비와 높이 중 더 작은 값을 구해서 원의 크기를 제한하는데 사용
		let maxRadius = smallerSide / 3; // 작은 쪽 길이의 1/3을 최대 반지름으로 설정해서 원이 화면을 벗어나지 않도록 함
		let minRadius = maxRadius / 2; // 최대 반지름의 절반을 최소 반지름으로 설정해서 원의 크기에 다양성을 줌
		this.intersectionDotRadius = minRadius / 10; // 최소 반지름의 1/10을 교차점 크기로 설정해서 교차점이 너무 크지 않도록 함

		// 원 생성
		this.circles = []; // 원들을 저장할 배열을 초기화해서 기존 원들을 모두 제거
		for (let i = 0; i < 5; ++i) { // 5개의 원을 생성하기 위해 반복문을 실행
			let newCircle = new Circle( // Circle 클래스의 생성자를 호출해서 새로운 원 객체를 생성
				this.stageWidth, // 스테이지 너비를 전달해서 원이 경계를 인식할 수 있도록 함
				this.stageHeight, // 스테이지 높이를 전달해서 원이 경계를 인식할 수 있도록 함
				minRadius, // 최소 반지름을 전달해서 원 크기의 하한을 설정
				maxRadius, // 최대 반지름을 전달해서 원 크기의 상한을 설정
				this.circleSpeed, // 원의 이동 속도를 전달해서 모든 원이 동일한 속도로 움직이도록 함
				(alpha = 1) => `hsla(${Math.random() * 360}, 70%, 50%, ${alpha})`, // 랜덤 색상 생성 함수를 전달해서 각 원이 다른 색상을 가지도록 함
				(min, max) => Math.random() * (max - min) + min // 범위 내 랜덤 값 생성 함수를 전달해서 원의 위치와 크기를 랜덤하게 설정
			);
			this.circles.push(newCircle); // 생성한 원을 배열에 추가해서 애니메이션에서 사용할 수 있도록 함
		}
	}

	draw() {
		// 원들 그리기 (밝게 표시)
		this.ctx.globalCompositeOperation = "lighter"; // 그래픽 합성 모드를 'lighter'로 설정해서 겹치는 부분이 더 밝게 표시되도록 함
		this.circles.forEach((circle) => { // 모든 원들을 순회하면서 각각을 처리
			circle.update(); // 원의 위치를 업데이트해서 이동과 경계 충돌을 처리
			circle.draw(this.ctx, this.circleStrokeColor); // 원을 캔버스에 그려서 화면에 표시
		});
		this.ctx.globalCompositeOperation = "normal"; // 그래픽 합성 모드를 기본값으로 되돌려서 교차점이 정상적으로 그려지도록 함
	}

	drawDot() {
		// 교차점들 그리기
		for (let i = 0; i < this.circles.length; ++i) { // 첫 번째 원을 선택하기 위해 모든 원을 순회
			let circleA = this.circles[i]; // 현재 인덱스의 원을 circleA로 설정해서 비교 대상으로 사용
			for (let j = i + 1; j < this.circles.length; ++j) { // 중복 비교를 피하기 위해 다음 인덱스부터 순회
				let circleB = this.circles[j]; // 비교할 상대방 원을 circleB로 설정
				
				let intersectionPoints = Circle.getIntersectionPoints(circleA, circleB); // 두 원의 교차점을 계산해서 교차점 좌표들을 얻음
				
				if (intersectionPoints) { // 교차점이 존재하는지 확인해서 교차하는 경우만 처리
					intersectionPoints.forEach(point => { // 모든 교차점을 순회하면서 각각을 그림
						this.drawCircle( // 교차점을 작은 원으로 그려서 시각적으로 표시
							point.x, // 교차점의 x 좌표를 전달
							point.y, // 교차점의 y 좌표를 전달
							this.intersectionDotRadius, // 교차점의 크기를 전달
							this.intersectionFillColor, // 교차점의 내부 색상을 전달
							this.intersectionStrokeColor // 교차점의 테두리 색상을 전달
						);
					});
				}
			}
		}
	}

	drawCircle(x, y, radius, fillColor, strokeColor) {
		// 원 그리기 (교차점 그리기용)
		this.ctx.fillStyle = fillColor; // 원의 내부를 채울 색상을 설정해서 원의 내부가 지정된 색으로 표시되도록 함
		this.ctx.strokeStyle = strokeColor; // 원의 테두리 색상을 설정해서 원의 경계가 지정된 색으로 표시되도록 함
		this.ctx.beginPath(); // 새로운 그리기 경로를 시작해서 이전 그리기 작업과 분리
		this.ctx.arc(x, y, radius, 0, 2 * Math.PI); // 지정된 좌표와 반지름으로 완전한 원을 그리기 위한 호를 생성
		this.ctx.fill(); // 원의 내부를 지정된 색상으로 채워서 원이 보이도록 함
		this.ctx.stroke(); // 원의 테두리를 그려서 원의 경계를 명확히 함
	}

	animate(t) {
		requestAnimationFrame(this.animate.bind(this)); // 다음 애니메이션 프레임을 요청해서 지속적인 애니메이션을 구현

		this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight); // 캔버스 전체를 지워서 이전 프레임의 그림을 제거
		this.draw(); // 원들을 그려서 현재 프레임의 원들을 표시
		this.drawDot(); // 교차점들을 그려서 원들 간의 교차점을 표시
	}
}

window.onload = () => { // 브라우저가 페이지를 완전히 로드했을 때 실행되는 이벤트 핸들러
	new App(); // App 클래스의 인스턴스를 생성해서 애니메이션을 시작
};