# 헤더 템플릿 사용 가이드

## 개요
US INNOWAVE 웹사이트의 헤더 컴포넌트를 재사용 가능한 템플릿으로 분리하여 새 페이지 생성 시 일관성 있는 헤더를 쉽게 적용할 수 있습니다.

## 파일 구조
```
templates/
├── header.html              # 헤더 템플릿 파일
├── footer.html              # 푸터 템플릿 파일
├── sub-hero.html            # 서브페이지 히어로 배너 템플릿
└── TEMPLATE_USAGE_GUIDE.md  # 이 가이드 문서
```

## 헤더 템플릿 사용법

### 1. 기본 사용법
새 HTML 페이지에서 헤더 템플릿을 사용하려면:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>새 페이지</title>
    
    <!-- 필수 CSS -->
    <link rel="stylesheet" href="css/user.css">
    <link rel="stylesheet" href="css/top_menu_style.css">
    
    <!-- 필수 JS -->
    <script src="js/jquery-3.7.1.min.js"></script>
    <script src="js/jquery-migrate-3.5.2.min.js"></script>
    <script src="js/top_menu_script.js"></script>
    
    <!-- Feather Icons -->
    <script src="https://unpkg.com/feather-icons"></script>
</head>
<body>
    <!-- 100% 배경이미지 때문에 사용 -->
    <div id="sh_wrapper">
        
        <!-- 헤더 템플릿 내용을 여기에 복사 -->
        <!-- templates/header.html 내용 전체 복사 -->
        
        <!-- 메인 콘텐츠 시작 -->
        <main id="sh_container">
            <div id="sh_container_wrapper">
                <!-- 페이지별 고유 콘텐츠 -->
            </div>
        </main>
        
    </div>
    
    <script>
        // Feather Icons 초기화
        feather.replace();
    </script>
</body>
</html>
```

### 2. 필수 의존성

#### CSS 파일
- `css/user.css` - 기본 디자인 토큰 및 변수
- `css/top_menu_style.css` - 헤더 메뉴 전용 스타일

#### JavaScript 파일
- `js/jquery-3.7.1.min.js` - jQuery 코어
- `js/jquery-migrate-3.5.2.min.js` - 호환성 플러그인
- `js/top_menu_script.js` - 메뉴 인터랙션 스크립트

#### 외부 라이브러리
- Feather Icons - 아이콘 표시용

### 3. 헤더 컴포넌트 구조

#### 주요 영역
- **로고**: `class="sh_logo"` - US INNOWAVE 브랜딩
- **메인 메뉴**: `class="sh_nav"` - 데스크톱 네비게이션
- **모바일 메뉴**: `id="pfWrap"` - 반응형 모바일 메뉴
- **메뉴 버튼**: `id="pfBtn"` - 모바일 햄버거 메뉴

#### 메뉴 항목
1. HOME (/)
2. 회사소개 (/company-intro.html)
3. 정책자금 컨설팅 (/policy-fund.html)
4. ISO & 기업인증 (/certification.html)
5. 미국 공급망 & 조달시장 (/us-market.html)
6. 수출 지원 (/services.html)
7. 문의하기 (/contact.html)

### 4. 커스터마이징

#### 메뉴 항목 수정
메뉴 항목을 수정하려면 `templates/header.html`에서 다음 부분을 편집:

```html
<!-- 데스크톱 메뉴 -->
<nav class="sh_nav">
    <ul>
        <li><a href="/">HOME</a></li>
        <!-- 새 메뉴 항목 추가 -->
        <li><a href="/new-page.html">새 메뉴</a></li>
    </ul>
</nav>

<!-- 모바일 메뉴도 동일하게 수정 -->
<div class="pf_cate">
    <ul>
        <!-- 동일한 구조로 추가 -->
    </ul>
</div>
```

#### 로고 변경
로고를 변경하려면:

```html
<div class="sh_logo">
    <a href="/"><span class="logo-text">새 로고 텍스트</span></a>
</div>
```

### 5. 기능 설명

#### 호버 효과
- 메뉴 항목에 마우스 오버 시 서브메뉴 표시
- 로고 이미지 변경 (흰색 ↔ 컬러)
- 배경 블러 효과

#### 모바일 반응형
- 화면 크기에 따른 자동 메뉴 전환
- 터치 친화적 인터랙션
- 애니메이션 효과

#### 접근성
- 키보드 네비게이션 지원
- 스크린 리더 호환
- 본문 바로가기 링크

### 6. 주의사항

1. **CSS 변수 의존성**: user.css의 CSS 변수가 필요합니다
   - `--primary`: 메인 색상
   - `--main-font`: 메인 폰트

2. **jQuery 의존성**: jQuery 3.7.1과 jQuery Migrate가 필요합니다

3. **파일 경로**: 상대 경로를 올바르게 설정해야 합니다

4. **Feather Icons**: CDN 또는 로컬 파일로 로드 필요

### 7. 문제 해결

#### 메뉴가 작동하지 않는 경우
1. jQuery가 올바르게 로드되었는지 확인
2. top_menu_script.js가 로드되었는지 확인
3. 브라우저 콘솔에서 JavaScript 오류 확인

#### 스타일이 적용되지 않는 경우
1. top_menu_style.css가 로드되었는지 확인
2. user.css의 CSS 변수가 정의되었는지 확인
3. 파일 경로가 올바른지 확인

#### 모바일 메뉴가 보이지 않는 경우
1. 뷰포트 메타 태그가 있는지 확인
2. CSS 미디어 쿼리 확인
3. 화면 크기별 테스트

## 서브 히어로 배너 템플릿 사용법

### 1. 기본 구조
서브페이지용 히어로 배너는 브레드크럼과 페이지 타이틀을 포함합니다:

```html
<!-- 서브 히어로 배너 템플릿 내용 복사 -->
<div id="sh_sub_wrap">
    <div id="shSub">
        <!-- 브레드크럼 네비게이션 -->
    </div>
    <ul id="shSnb">
        <!-- 서브 메뉴 (선택사항) -->
    </ul>
</div>

<div id="sh_content">
    <div id="pageCm" class="page-content">
        <!-- 페이지 타이틀 및 콘텐츠 -->
    </div>
</div>
```

### 2. 변수 치환
템플릿 사용 시 다음 부분을 실제 내용으로 교체:

- `[페이지명]` → 실제 페이지 이름
- `[페이지 제목]` → 메인 타이틀
- `[페이지 설명문]` → 페이지 소개 문구
- `[강조 텍스트]` → 하이라이트할 키워드

### 3. 페이지별 클래스
- 회사소개: `class="p01"`
- 정책자금: `class="p02"`
- 인증서비스: `class="p03"`
- 미국진출: `class="p04"`
- 수출지원: `class="p05"`

## 푸터 템플릿 사용법

### 1. 기본 사용
`footer.html` 내용을 페이지 하단에 복사하여 사용

### 2. 주요 구성
- 회사 정보 및 연락처
- 푸터 메뉴 (헤더와 일치)
- 저작권 정보
- 맨 위로 버튼

### 3. 필수 의존성
- Font Awesome CSS (맨 위로 버튼 아이콘)
- jQuery (맨 위로 버튼 기능)

## 통합 페이지 구조

완성된 상세페이지의 기본 구조:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <!-- 메타 정보 및 CSS -->
</head>
<body>
    <div id="sh_wrapper">
        <!-- 헤더 템플릿 -->
        <!-- header.html 내용 -->
        
        <main id="sh_container" class="sub">
            <div id="sh_container_wrapper">
                <!-- 서브 히어로 배너 템플릿 -->
                <!-- sub-hero.html 내용 -->
                
                <!-- 페이지별 고유 콘텐츠 -->
            </div>
        </main>
        
        <!-- 푸터 템플릿 -->
        <!-- footer.html 내용 -->
    </div>
</body>
</html>
```

### 8. 향후 개선 계획

1. **메인 히어로 배너 템플릿** 추가
2. **CSS 번들링** 시스템 구축  
3. **자동화 도구** 개발
4. **페이지 생성 스크립트** 개발

---

**작성일**: 2025-09-10  
**버전**: 2.0 (서브 히어로 배너 추가)  
**담당**: 템플릿 시스템 개발팀