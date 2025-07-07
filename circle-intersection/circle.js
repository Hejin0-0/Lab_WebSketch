/**
 * Circle 클래스
 * 
 * 2D 캔버스 환경에서 움직이는 원 객체를 정의합니다.
 * - 각 원은 랜덤한 색상, 위치, 반지름, 속도를 가집니다.
 * - 경계 충돌 시 반사하며, 교차점 좌표 계산 기능을 제공합니다.
 * 
 * 사용 예시:
 *   const circle = new Circle(...);
 *   circle.update();
 *   circle.draw(ctx, "#fff");
 * 
 * @param {number} stageWidth   - 캔버스의 가로 길이 (픽셀)
 * @param {number} stageHeight  - 캔버스의 세로 길이 (픽셀)
 * @param {number} minRadius    - 원의 최소 반지름
 * @param {number} maxRadius    - 원의 최대 반지름
 * @param {number} circleSpeed  - 원의 이동 속도
 * @param {function} getRandomColor      - 색상 랜덤 함수 (alpha 인자 지원)
 * @param {function} getRandomFromRange  - 범위 내 랜덤 값 함수
 */

export class Circle {
    constructor(stageWidth, stageHeight, minRadius, maxRadius, circleSpeed, getRandomColor, getRandomFromRange) {
        // 캔버스 크기와 원의 속성(색, 반지름, 위치, 속도)을 초기화합니다.
        this.stageWidth = stageWidth;      // 캔버스 가로 크기
        this.stageHeight = stageHeight;    // 캔버스 세로 크기
        this.circleSpeed = circleSpeed;    // 원의 이동 속도
        this.getRandomColor = getRandomColor;          // 랜덤 색상 생성 함수
        this.getRandomFromRange = getRandomFromRange;  // 랜덤 값 생성 함수

        // 원의 시각적 특성 및 초기 위치/속도 설정
        this.color = this.getRandomColor(0.5); // 0.5 투명도의 랜덤 색상
        this.radius = this.getRandomFromRange(minRadius, maxRadius); // min~max 반지름 중 랜덤
        this.xPos = this.getRandomFromRange(maxRadius, stageWidth - maxRadius);   // 경계 밖으로 안 나가도록 위치 지정
        this.yPos = this.getRandomFromRange(maxRadius, stageHeight - maxRadius);  // 경계 밖으로 안 나가도록 위치 지정

        // 원의 이동 방향(각도) 및 속도 벡터 계산
        const randomAngle = Math.random() * (Math.PI * 2); // 0~360도 중 임의 각도
        this.velocityX = Math.cos(randomAngle) * this.circleSpeed; // x축 속도
        this.velocityY = Math.sin(randomAngle) * this.circleSpeed; // y축 속도
    }

    /**
     * 원의 위치를 한 프레임만큼 갱신합니다.
     * - 경계에 닿으면 반사(속도 반전)
     * - 초보자 팁: 화면 밖으로 벗어나지 않게 하려면 반지름만큼 여유를 둡니다.
     */
    update() {
        // x축 경계 충돌 체크 및 반사
        if (
            (this.xPos + this.radius > this.stageWidth && this.velocityX > 0) ||
            (this.xPos < this.radius && this.velocityX < 0)
        ) {
            this.velocityX = -this.velocityX;
        }

        // y축 경계 충돌 체크 및 반사
        if (
            (this.yPos + this.radius > this.stageHeight && this.velocityY > 0) ||
            (this.yPos < this.radius && this.velocityY < 0)
        ) {
            this.velocityY = -this.velocityY;
        }

        // 위치 갱신 (현재 위치에 속도 더함)
        this.xPos += this.velocityX;
        this.yPos += this.velocityY;
    }

    /**
     * 캔버스에 원을 그립니다.
     * @param {CanvasRenderingContext2D} ctx - 2D 캔버스 컨텍스트
     * @param {string} strokeColor - 원 테두리 색상
     * 
     * 초보자 팁: ctx.arc는 (x, y, 반지름, 시작각, 끝각) 순서로 원을 그림
     */
    draw(ctx, strokeColor) {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    /**
     * 두 원의 교차점 좌표를 계산합니다.
     * - 두 원이 겹치는 경우에만 좌표를 반환합니다.
     * - 반환값: [{x, y}, {x, y}] 형식의 교차점 좌표 배열 또는 null
     * 
     * 초보자 팁: 두 원 중심 사이의 거리가 반지름 합보다 작으면 원이 겹칩니다.
     */
    static getIntersectionPoints(circleA, circleB) {
        // 두 원 중심 좌표 차이 계산
        const dx = circleB.xPos - circleA.xPos;
        const dy = circleB.yPos - circleA.yPos;
        const distance = Math.hypot(dx, dy); // 두 중심 사이의 직선 거리

        // 겹치는 경우에만 교차점 좌표 반환
        if (distance <= circleA.radius + circleB.radius) {
            return Circle.calculateIntersectionPoints(
                circleA.radius,
                circleB.radius,
                distance,
                dx,
                dy,
                circleA
            );
        }
        return null;
    }

    /**
     * 두 원의 교차점 좌표를 삼각법으로 계산합니다.
     * - 수학적 배경: 코사인 법칙을 활용하여 두 교차점의 각도를 구함
     * - 반환값: [{x, y}, {x, y}]
     * 
     * 초보자 팁: 삼각법이 익숙하지 않다면, 두 원 중심을 잇는 선을 기준으로 각도를 구해
     *           그 방향에서 반지름만큼 떨어진 두 점이 교차점이 됩니다.
     */
    static calculateIntersectionPoints(sideA, sideB, sideC, dx, dy, circle) {
        // 각 변의 제곱 계산 (코사인 법칙에 필요)
        const aSquare = Math.pow(sideA, 2);
        const bSquare = Math.pow(sideB, 2);
        const cSquare = Math.pow(sideC, 2);

        // 코사인 법칙으로 교차점 각도 구함
        const cosA = (aSquare - bSquare + cSquare) / (2 * sideA * sideC);
        const angleOfRotation = Math.acos(cosA); // 교차점 각도 (라디안)
        const angleCorrection = Math.atan2(dy, dx); // 중심선의 각도

        // 첫 번째 교차점 좌표 계산
        const pointOneX = circle.xPos + Math.cos(angleCorrection - angleOfRotation) * sideA;
        const pointOneY = circle.yPos + Math.sin(angleCorrection - angleOfRotation) * sideA;

        // 두 번째 교차점 좌표 계산
        const pointTwoX = circle.xPos + Math.cos(angleCorrection + angleOfRotation) * sideA;
        const pointTwoY = circle.yPos + Math.sin(angleCorrection + angleOfRotation) * sideA;

        // [{x, y}, {x, y}] 형식으로 반환
        return [
            { x: pointOneX, y: pointOneY },
            { x: pointTwoX, y: pointTwoY }
        ];
    }
}
