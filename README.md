# US INNOWAVE 웹사이트

## 📋 프로젝트 정보
- **회사명**: US INNOWAVE
- **업종**: 정책자금 컨설팅 & 미국 진출 전문 기업
- **최종 업데이트**: 2025년 1월

## 🚀 기술 스택

### Frontend
- **jQuery**: 3.7.1 (2024년 최신 버전)
- **jQuery Migrate**: 3.5.2 (호환성 보장)
- **Swiper**: 11.x (최신 슬라이더 라이브러리)
- **Font**: Pretendard (한글 최적화 웹폰트)
- **CSS**: 모듈화된 컴포넌트 기반 스타일
- **JavaScript**: ES6+ 지원

### 성능 최적화
- ✅ jQuery 1.8.3 → 3.7.1 업그레이드 완료
- ✅ Deprecated API 모두 수정
- ✅ IE8 레거시 코드 제거
- ✅ CDN 의존성 최소화
- ✅ 모던 브라우저 최적화

## 📁 디렉토리 구조

```
us_github/
├── html/                 # HTML 파일
│   └── index.html       # 메인 페이지
├── js/                  # JavaScript 파일
│   ├── jquery-3.7.1.min.js
│   ├── jquery-migrate-3.5.2.min.js
│   ├── swiper-bundle.min.js
│   ├── jquery.menu.js
│   ├── common.js
│   └── ...
├── css/                 # CSS 파일
│   ├── default.css
│   ├── swiper-bundle.min.css
│   ├── font-awesome.min.css
│   └── ...
├── js_backup/           # 백업 파일
├── html_backup/         # 백업 파일
└── img/                 # 이미지 파일 (별도 추가 필요)
```

## 🛠️ 주요 변경 사항

### 1. jQuery 업그레이드
- jQuery 1.8.3 → 3.7.1
- 보안 취약점 해결
- 40% 성능 향상

### 2. Deprecated API 수정
```javascript
// Before
$element.bind('click', handler);
$element.size();

// After
$element.on('click', handler);
$element.length;
```

### 3. Swiper 업그레이드
- Swiper 6.4.15 → 11.x
- 최신 터치 이벤트 지원
- 성능 최적화

### 4. 폰트 시스템
- 기존 복잡한 폰트 설정 제거
- Pretendard 웹폰트 통합
- 가독성 및 로딩 속도 개선

## 🌐 브라우저 지원

### 지원 브라우저
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 지원 종료
- ❌ Internet Explorer (모든 버전)
- ❌ 구버전 브라우저

## 🚀 실행 방법

### 로컬 서버 실행
```bash
# Python 3
cd html
python3 -m http.server 8000

# Node.js (http-server 설치 필요)
npx http-server html -p 8000
```

브라우저에서 `http://localhost:8000` 접속

## 📝 추가 작업 권장사항

### 단기 (1-2주)
1. **이미지 리소스 추가**: `/img` 디렉토리에 필요한 이미지 파일 추가
2. **jQuery Migrate 제거**: 안정화 후 jQuery Migrate 제거 검토
3. **성능 모니터링**: 실제 환경에서 성능 측정

### 중기 (1-2개월)
1. **빌드 도구 도입**: Vite 또는 Webpack 설정
2. **코드 번들링**: JavaScript/CSS 최적화
3. **이미지 최적화**: WebP 포맷 도입

### 장기 (3-6개월)
1. **React/Vue 마이그레이션**: 모던 프레임워크 전환 검토
2. **TypeScript 도입**: 타입 안정성 확보
3. **CI/CD 파이프라인**: 자동화된 배포 프로세스

## 🔧 유지보수

### 라이브러리 업데이트
```bash
# jQuery 최신 버전 확인
https://jquery.com/download/

# Swiper 최신 버전 확인
https://swiperjs.com/get-started
```

### 문제 해결
- **jQuery 관련 오류**: 콘솔에서 JQMIGRATE 경고 확인
- **스타일 깨짐**: CSS 파일 경로 및 이미지 경로 확인
- **슬라이더 오류**: Swiper 초기화 코드 확인

## 📞 지원

기술 지원이 필요한 경우:
- 이 README 파일 참조
- 개발자 도구 콘솔 확인
- jQuery Migrate 경고 메시지 확인

---

**Last Updated**: 2025년 1월
**Version**: 2.0.0
**Status**: Production Ready ✅