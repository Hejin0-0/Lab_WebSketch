class URLShortener {
    constructor() {
        // DOM 요소들을 클래스 초기화 시 한 번만 선택
        this.form = document.getElementById('urlForm');
        this.originalUrlInput = document.getElementById('originalUrl');
        this.shortenedUrlTextarea = document.getElementById('shortenedUrl');
        this.shortenBtn = document.getElementById('shortenBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.copyBtn = document.getElementById('copyBtn');
        
        this.init();
    }

    // 초기화 메서드
    init() {
        this.bindEvents();
        this.loadFromStorage();
    }

    // 이벤트 바인딩 - 메모리 효율적으로 한 번만 바인딩
    bindEvents() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.resetBtn.addEventListener('click', this.handleReset.bind(this));
        this.copyBtn.addEventListener('click', this.handleCopy.bind(this));
        this.originalUrlInput.addEventListener('input', this.handleInputChange.bind(this));
    }

    // 폼 제출 처리 (async/await로 현대적인 비동기 처리)
    async handleSubmit(e) {
        e.preventDefault();
        
        const url = this.originalUrlInput.value.trim();
        if (!this.isValidURL(url)) {
            this.showError('올바른 URL을 입력해주세요.');
            return;
        }

        await this.shortenURL(url);
    }

    // 초기화 버튼 처리
    handleReset() {
        this.form.reset();
        this.clearResult();
        this.originalUrlInput.focus();
        this.clearStorage();
    }

    // 클립보드 복사 기능 (최신 API 사용, 폴백 포함)
    async handleCopy() {
        try {
            await navigator.clipboard.writeText(this.shortenedUrlTextarea.value);
            this.showCopySuccess();
        } catch (err) {
            // 구형 브라우저 대응
            this.shortenedUrlTextarea.select();
            document.execCommand('copy');
            this.showCopySuccess();
        }
    }

    // 입력 변경 시 자동 저장
    handleInputChange() {
        if (this.shortenedUrlTextarea.value) {
            this.saveToStorage();
        }
    }

    // URL 단축 API 호출 (에러 처리 강화)
    async shortenURL(url) {
        this.setLoading(true);
        
        try {
            const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const shortenedUrl = await response.text();
            
            if (shortenedUrl.includes('Error') || !this.isValidURL(shortenedUrl)) {
                throw new Error('Invalid response from API');
            }
            
            this.showSuccess(shortenedUrl);
            this.saveToStorage();
            
        } catch (error) {
            console.error('URL shortening failed:', error);
            this.showError('URL 단축에 실패했습니다. 다시 시도해주세요.');
        } finally {
            this.setLoading(false);
        }
    }

    // 로딩 상태 관리
    setLoading(loading) {
        if (loading) {
            this.shortenBtn.disabled = true;
            this.shortenBtn.innerHTML = `
                <span class="loading">
                    <span class="spinner"></span>
                    처리중...
                </span>
            `;
        } else {
            this.shortenBtn.disabled = false;
            this.shortenBtn.innerHTML = '<i class="bx bx-link"></i> 단축하기';
        }
    }

    // 성공 상태 표시
    showSuccess(shortenedUrl) {
        this.shortenedUrlTextarea.value = shortenedUrl;
        this.shortenedUrlTextarea.className = 'textarea result-success';
        this.copyBtn.style.display = 'block';
    }

    // 에러 상태 표시
    showError(message) {
        this.shortenedUrlTextarea.value = `오류: ${message}`;
        this.shortenedUrlTextarea.className = 'textarea result-error';
        this.copyBtn.style.display = 'none';
    }

    // 결과 초기화
    clearResult() {
        this.shortenedUrlTextarea.value = '';
        this.shortenedUrlTextarea.className = 'textarea';
        this.copyBtn.style.display = 'none';
    }

    // 복사 성공 피드백
    showCopySuccess() {
        const originalText = this.copyBtn.innerHTML;
        this.copyBtn.innerHTML = '<i class="bx bx-check"></i> 복사됨!';
        this.copyBtn.style.background = 'var(--success-color)';
        
        setTimeout(() => {
            this.copyBtn.innerHTML = originalText;
            this.copyBtn.style.background = 'var(--primary-color)';
        }, 1500);
    }

    // URL 유효성 검사 (내장 URL 생성자 사용)
    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // 세션 스토리지에 데이터 저장 (에러 처리 포함)
    saveToStorage() {
        const data = {
            originalUrl: this.originalUrlInput.value,
            shortenedUrl: this.shortenedUrlTextarea.value,
            timestamp: Date.now()
        };
        try {
            sessionStorage.setItem('urlShortenerData', JSON.stringify(data));
        } catch (e) {
            console.warn('Unable to save to sessionStorage:', e);
        }
    }

    // 저장된 데이터 로드 (1시간 만료)
    loadFromStorage() {
        try {
            const data = JSON.parse(sessionStorage.getItem('urlShortenerData'));
            if (data && Date.now() - data.timestamp < 3600000) { // 1시간
                this.originalUrlInput.value = data.originalUrl || '';
                if (data.shortenedUrl) {
                    this.showSuccess(data.shortenedUrl);
                }
            }
        } catch (e) {
            console.warn('Unable to load from sessionStorage:', e);
        }
    }

    // 저장된 데이터 삭제
    clearStorage() {
        try {
            sessionStorage.removeItem('urlShortenerData');
        } catch (e) {
            console.warn('Unable to clear sessionStorage:', e);
        }
    }
}

// DOM 로드 완료 시 앱 초기화 (한 번만 실행)
document.addEventListener('DOMContentLoaded', () => {
    new URLShortener();
});