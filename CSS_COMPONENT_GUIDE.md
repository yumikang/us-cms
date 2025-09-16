# 📚 CSS Component Guide
## US INNOWAVE 컴포넌트 사용 가이드

### 목차
1. [프로젝트 현황](#프로젝트-현황)
2. [디자인 토큰 시스템](#디자인-토큰-시스템)
3. [버튼 컴포넌트](#버튼-컴포넌트)
4. [카드 컴포넌트](#카드-컴포넌트)
5. [그리드 시스템](#그리드-시스템)
6. [타이포그래피](#타이포그래피)
7. [반응형 유틸리티](#반응형-유틸리티)
8. [섹션 레이아웃](#섹션-레이아웃)
9. [템플릿 시스템](#템플릿-시스템)
10. [현재 페이지 구조](#현재-페이지-구조)

---

## 📊 프로젝트 현황

### 웹사이트 구조
- **메인 도메인**: https://www.usiw.kr/
- **회사명**: (주)유에스이노웨이브 (US INNOWAVE)
- **사이트맵**: sitemap.xml, robots.txt 생성 완료

### 현재 페이지 목록
```
📁 html/
├── index.html (메인 페이지)
├── company-intro.html (회사소개)
├── services.html (수출 지원)
├── us-market.html (미국 공급망 & 조달시장)
├── policy-fund.html (정책자금 컨설팅)
├── certification.html (ISO & 기업인증)
└── contact.html (문의하기)
```

### CSS 파일 구조
```
📁 css/
├── default.css (기본 리셋)
├── user.css (메인 스타일시트)
├── subpage.css (서브페이지 전용)
├── utility-classes.css (유틸리티)
├── top_menu_style.css (네비게이션)
├── hero-section.css (히어로 섹션)
├── service-cards.css (서비스 카드)
├── cta-section.css, cta-banner.css (CTA)
├── image-gallery.css (이미지 갤러리)
├── main_banner_style.css (메인 배너)
├── aos.css (애니메이션)
├── swiper.min.css, swiper-bundle.min.css (슬라이더)
└── font-awesome.min.css (아이콘)
```

### JavaScript 라이브러리
```
📁 js/
├── jquery-3.7.1.min.js (jQuery 최신)
├── jquery-migrate-3.5.2.min.js (마이그레이션)
├── jquery.menu.js (메뉴)
├── aos.js (스크롤 애니메이션)
├── gsap.min.js (GSAP 애니메이션)
├── ScrollTrigger.min.js (스크롤 트리거)
├── swiper.min.js, swiper-bundle.min.js (슬라이더)
├── feather.min.js (아이콘)
├── hero-slider.js (히어로 슬라이더)
├── top_menu_script.js (메뉴 스크립트)
├── common.js (공통 함수)
├── designTail.js (디자인 유틸)
└── wrest.js (기타 기능)
```

### 템플릿 시스템
```
📁 templates/
├── header.html (공통 헤더)
├── footer.html (공통 푸터)
├── sub-hero.html (서브페이지 히어로)
├── cta-section.html (CTA 섹션)
├── font-optimization-helper.html (폰트 최적화)
└── responsive-image-helper.html (이미지 최적화)
```

### 최근 정리 작업
- ✅ 테스트 파일 7개 삭제 (jquery-ui-removal-test.html 등)
- ✅ js_backup 폴더 삭제 (백업 파일)
- ✅ usinnowave 폴더 삭제 (Next.js 프로젝트)
- ✅ data 폴더 삭제 (작업 기록 데이터)
- ✅ 모든 페이지 푸터 회사명 통일: "(주)유에스이노웨이브"

---

## 🎨 디자인 토큰 시스템

CSS 변수를 통해 일관된 디자인을 유지합니다.

### 색상 사용법
```css
/* 주요 색상 */
background: var(--primary);        /* 메인 오렌지 #f47320 */
color: var(--primary-light);       /* 밝은 오렌지 #ff8a47 */
border-color: var(--primary-dark); /* 어두운 오렌지 #d35f0c */

/* 회색 스케일 */
background: var(--gray-100);       /* 연한 배경 #f5f5f5 */
color: var(--gray-500);            /* 서브 텍스트 #777 */
border: 1px solid var(--gray-200); /* 연한 보더 #e1e1e1 */
```

### 간격 시스템
```css
/* 작은 → 큰 순서 */
padding: var(--space-sm);   /* 8px */
margin: var(--space-lg);    /* 15px */
gap: var(--space-xl);       /* 20px */
padding: var(--space-4xl);  /* 40px */
```

### 폰트 크기
```css
font-size: var(--font-size-sm);   /* 14px - 보조 텍스트 */
font-size: var(--font-size-base); /* 16px - 본문 */
font-size: var(--font-size-xl);   /* 20px - 소제목 */
font-size: var(--font-size-4xl);  /* 45px - 페이지 제목 */
```

---

## 🔘 버튼 컴포넌트

### 기본 버튼
```html
<!-- 기본 버튼 -->
<button class="btn btn-primary">확인</button>
<a href="#" class="btn btn-primary">자세히 보기</a>

<!-- 아웃라인 버튼 -->
<button class="btn btn-outline">취소</button>

<!-- 흰색 버튼 (어두운 배경용) -->
<button class="btn btn-white">더보기</button>
```

### 크기 변형
```html
<!-- 큰 버튼 -->
<button class="btn btn-primary btn-lg">큰 버튼</button>

<!-- 작은 버튼 -->
<button class="btn btn-primary btn-sm">작은 버튼</button>
```

### 실제 사용 예시
```html
<div class="section">
  <h2 class="title-main">서비스 소개</h2>
  <p class="subtitle">최고의 컨설팅 서비스를 제공합니다</p>
  <a href="/contact" class="btn btn-primary btn-lg">상담 신청하기</a>
</div>
```

---

## 🃏 카드 컴포넌트

### 기본 카드
```html
<div class="card">
  <div class="card-header">
    <h3 class="title-section">카드 제목</h3>
  </div>
  <div class="card-content">
    <p>카드 내용이 들어갑니다.</p>
  </div>
  <div class="card-footer">
    <a href="#" class="btn btn-primary btn-sm">더보기</a>
  </div>
</div>
```

### 서비스 카드 (아이콘 포함)
```html
<div class="card-service">
  <p class="card-service__title">정책자금 컨설팅</p>
  <img src="icon.svg" class="card-service__icon" alt="아이콘">
</div>
```

### 카드 그리드 레이아웃
```html
<div class="grid grid-3">
  <div class="card-service">
    <p class="card-service__title">컨설팅</p>
    <img src="icon1.svg" class="card-service__icon">
  </div>
  <div class="card-service">
    <p class="card-service__title">미국 진출</p>
    <img src="icon2.svg" class="card-service__icon">
  </div>
  <div class="card-service">
    <p class="card-service__title">투자 유치</p>
    <img src="icon3.svg" class="card-service__icon">
  </div>
</div>
```

---

## 📐 그리드 시스템

### 기본 그리드
```html
<!-- 2열 그리드 -->
<div class="grid grid-2">
  <div>컬럼 1</div>
  <div>컬럼 2</div>
</div>

<!-- 3열 그리드 -->
<div class="grid grid-3">
  <div>컬럼 1</div>
  <div>컬럼 2</div>
  <div>컬럼 3</div>
</div>

<!-- 4열 그리드 -->
<div class="grid grid-4">
  <div>컬럼 1</div>
  <div>컬럼 2</div>
  <div>컬럼 3</div>
  <div>컬럼 4</div>
</div>
```

### 통계 그리드 (특수 레이아웃)
```html
<div class="stats-grid">
  <div class="card-service">통계 1</div>
  <div class="card-service">통계 2</div>
  <div class="card-service">통계 3</div>
  <div class="card-service">통계 4</div>
</div>
```

---

## 📝 타이포그래피

### 제목 스타일
```html
<!-- 메인 제목 -->
<h1 class="title-main">US INNOWAVE</h1>

<!-- 섹션 제목 -->
<h2 class="title-section">회사 소개</h2>

<!-- 영문 강조 제목 -->
<span class="title-english">About Us</span>

<!-- 부제목 -->
<p class="subtitle">혁신적인 컨설팅 서비스</p>
```

### 텍스트 정렬
```html
<div class="text-center">가운데 정렬</div>
<div class="text-primary">주요 색상 텍스트</div>
```

---

## 📱 반응형 유틸리티

### 브레이크포인트
| 브레이크포인트 | 크기 | 디바이스 |
|--------------|------|---------|
| xs | < 576px | 모바일 세로 |
| sm | ≥ 576px | 모바일 가로 |
| md | ≥ 768px | 태블릿 |
| lg | ≥ 992px | 데스크톱 |
| xl | ≥ 1200px | 큰 데스크톱 |
| xxl | ≥ 1560px | 와이드 스크린 |

### 가시성 제어
```html
<!-- 모바일에서만 표시 -->
<div class="visible-xs hidden-sm hidden-md hidden-lg hidden-xl">
  모바일 전용 콘텐츠
</div>

<!-- 데스크톱에서만 표시 -->
<div class="desktop-only">
  데스크톱 전용 콘텐츠
</div>

<!-- 태블릿에서 숨김 -->
<div class="tablet-hidden">
  태블릿에서는 보이지 않음
</div>
```

### 반응형 정렬
```html
<!-- 모바일에서 가운데, 데스크톱에서 왼쪽 정렬 -->
<div class="text-center-mobile text-left-desktop">
  반응형 텍스트 정렬
</div>

<!-- 모바일에서 세로 배치, 데스크톱에서 가로 배치 -->
<div class="flex flex-column-mobile flex-row-desktop">
  <div>아이템 1</div>
  <div>아이템 2</div>
  <div>아이템 3</div>
</div>
```

---

## 🏗️ 섹션 레이아웃

### 기본 섹션
```html
<section class="section">
  <div class="container">
    <h2 class="title-main">섹션 제목</h2>
    <p class="subtitle">섹션 설명</p>
    <!-- 콘텐츠 -->
  </div>
</section>
```

### 히어로 섹션
```html
<section class="section-hero">
  <div class="container">
    <h1 class="title-main">대제목</h1>
    <p class="subtitle">부제목</p>
    <a href="#" class="btn btn-primary btn-lg">CTA 버튼</a>
  </div>
</section>
```

### 내부 레이아웃
```html
<section class="section">
  <div class="section-inner">
    <div class="title">
      <h2 class="title-main">좌측 고정 제목</h2>
    </div>
    <div class="content">
      <!-- 우측 콘텐츠 -->
    </div>
  </div>
</section>
```

---

## 🎯 실전 예제: 서브페이지 만들기

### 회사소개 페이지 예시
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <link rel="stylesheet" href="css/user.css">
</head>
<body>
  <!-- 헤더 영역 -->
  <header id="sh_hd">
    <!-- 네비게이션 -->
  </header>

  <!-- 히어로 섹션 -->
  <section class="section-hero">
    <div class="container">
      <span class="title-english">About Us</span>
      <h1 class="title-main">회사소개</h1>
      <p class="subtitle">혁신적인 컨설팅 서비스를 제공합니다</p>
    </div>
  </section>

  <!-- 서비스 섹션 -->
  <section class="section">
    <div class="container">
      <h2 class="title-section mb-3xl">주요 서비스</h2>
      
      <div class="grid grid-3">
        <div class="card-service">
          <p class="card-service__title">정책자금 컨설팅</p>
          <img src="icon1.svg" class="card-service__icon">
        </div>
        
        <div class="card-service">
          <p class="card-service__title">미국 진출 지원</p>
          <img src="icon2.svg" class="card-service__icon">
        </div>
        
        <div class="card-service">
          <p class="card-service__title">투자 유치</p>
          <img src="icon3.svg" class="card-service__icon">
        </div>
      </div>
      
      <div class="text-center mt-3xl">
        <a href="/contact" class="btn btn-primary btn-lg">
          상담 신청하기
        </a>
      </div>
    </div>
  </section>

  <!-- 푸터 영역 -->
  <footer id="sh_ft">
    <!-- 푸터 내용 -->
  </footer>
</body>
</html>
```

---

## 🔧 유용한 팁

### 1. 간격 조절
```html
<!-- margin 유틸리티 클래스 활용 -->
<div class="mb-lg">아래 15px 간격</div>
<div class="mt-2xl">위 25px 간격</div>
```

### 2. 색상 조합
```html
<!-- 배경과 텍스트 색상 조합 -->
<div class="bg-primary text-white">주요 색상 배경</div>
<div class="bg-light text-primary">밝은 배경</div>
```

### 3. 반응형 고려사항
- 모바일: 그리드는 자동으로 1열로 변경
- 태블릿: 3-4열 그리드는 2열로 조정
- 폰트 크기: 모바일에서 자동으로 축소

### 4. 컴포넌트 조합
```html
<!-- 카드 안에 버튼 배치 -->
<div class="card">
  <div class="card-content">
    <h3 class="title-section">제목</h3>
    <p class="subtitle">설명</p>
    <a href="#" class="btn btn-primary btn-sm mt-lg">더보기</a>
  </div>
</div>
```

---

## 🏗️ 템플릿 시스템

### 공통 템플릿 사용법

#### 헤더 템플릿
```html
<!-- templates/header.html 사용 -->
<header id="sh_hd">
  <!-- 로고, 네비게이션, 모바일 메뉴 포함 -->
</header>
```

#### 푸터 템플릿
```html
<!-- templates/footer.html 사용 -->
<footer id="sh_ft">
  <!-- 회사 정보, 개인정보처리방침, 이용약관 모달 포함 -->
</footer>
```

#### 서브페이지 히어로 배너
```html
<!-- templates/sub-hero.html 기반 -->
<section class="sub_hero_wrap">
  <div class="sub_hero_container">
    <div class="sub_hero_text">
      <h1>페이지 제목</h1>
    </div>
  </div>
</section>
```

#### CTA 섹션
```html
<!-- templates/cta-section.html 기반 -->
<section class="cta-section">
  <div class="inner">
    <div class="cta-content">
      <h2 class="cta-title">지금 바로 시작하세요</h2>
      <p class="cta-subtitle">전문가와 함께하는 성공적인 글로벌 비즈니스</p>
      <div class="cta-buttons">
        <a href="contact.html" class="btn-primary">무료 상담 신청</a>
      </div>
    </div>
  </div>
</section>
```

---

## 📱 현재 페이지 구조

### 메인 페이지 (index.html)
- **히어로 슬라이더**: 3개 슬라이드 배경 이미지
- **서비스 섹션**: 4개 주요 서비스 카드
- **회사 소개**: 이미지 갤러리 + 텍스트
- **CTA 섹션**: 상담 신청 버튼 (깜빡거림 이슈 확인됨)
- **푸터**: 회사 정보, 개인정보처리방침, 이용약관 모달

### 서브페이지 공통 구조
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- SEO 메타태그 개선 필요 -->
  <link rel="stylesheet" href="../css/default.css">
  <link rel="stylesheet" href="../css/user.css">
  <link rel="stylesheet" href="../css/subpage.css">
</head>
<body>
  <!-- 헤더 (공통) -->
  <header id="sh_hd">...</header>

  <!-- 서브페이지 콘텐츠 -->
  <div class="sub_container">
    <!-- 각 페이지별 고유 콘텐츠 -->
  </div>

  <!-- 푸터 (공통) -->
  <footer id="sh_ft">...</footer>
</body>
</html>
```

### JavaScript 애니메이션
- **AOS**: 스크롤 시 페이드 업 애니메이션 (`data-aos="fade-up"`)
- **GSAP + ScrollTrigger**: 복잡한 스크롤 애니메이션
- **Swiper**: 이미지 슬라이더
- **jQuery**: 메뉴 토글, 스크롤 이벤트

### 알려진 이슈
- **CTA 섹션 깜빡거림**: AOS와 GSAP 충돌 가능성
- **SEO 메타태그**: description, keywords 등 누락
- **Open Graph**: 소셜 미디어 공유용 메타태그 누락

---

## 🚀 개발 가이드라인

### 새 페이지 추가 시
1. **템플릿 사용**: `templates/` 폴더의 공통 요소 활용
2. **CSS 구조**: 기본 CSS → 페이지별 CSS 순서 유지
3. **JavaScript**: 필요한 라이브러리만 로드
4. **SEO 최적화**: 메타태그, sitemap.xml 업데이트

### 성능 최적화
- **이미지**: WebP 형식 권장, 최적 크기 사용
- **CSS**: 중복 제거, 미사용 스타일 정리
- **JavaScript**: 번들링, 미사용 라이브러리 제거
- **폰트**: Pretendard 폰트 최적화 적용

### 반응형 대응
- **브레이크포인트**: 768px (태블릿), 480px (모바일)
- **그리드**: CSS Grid 활용, 자동 반응형
- **이미지**: picture 태그 또는 srcset 속성 사용
- **텍스트**: vw 단위 또는 clamp() 함수 활용

---

## 📞 지원 및 참고

### 개발 참고 자료
- **CSS 가이드**: 이 문서 (`CSS_COMPONENT_GUIDE.md`)
- **템플릿**: `templates/` 폴더의 HTML 파일들
- **메인 스타일**: `css/user.css` 파일 주석 참조
- **유틸리티**: `css/utility-classes.css` 참조

### 브라우저 테스트
- **Chrome**: 개발자 도구 활용
- **Safari**: 모바일 Safari 호환성 확인
- **Firefox**: 크로스 브라우저 테스트
- **Edge**: 기본 호환성 확인

### 배포 전 체크리스트
- [ ] 모든 링크 작동 확인
- [ ] 반응형 디자인 테스트
- [ ] 로딩 속도 확인
- [ ] SEO 메타태그 확인
- [ ] 브라우저 호환성 테스트

**Last Updated**: 2025년 1월 (프로젝트 정리 완료)
**Version**: 2.0.0
**Domain**: https://www.usiw.kr/