# US INNOWAVE Admin CMS 개발 가이드

## 📋 프로젝트 개요

### 프로젝트 정보
- **프로젝트명**: US INNOWAVE Admin CMS
- **개발 기간**: 2025년 9월 18일 ~ 9월 19일
- **기술 스택**: Next.js 14, TypeScript, Supabase, Tailwind CSS, shadcn/ui
- **데이터베이스**: Supabase PostgreSQL
- **배포**: Vercel (CMS), 수동 배포 (홈페이지)
- **저장소**: https://github.com/yumikang/us-cms
- **홈페이지**: https://www.usiw.kr
- **CMS URL**: https://us-cms.vercel.app

### 목적
US INNOWAVE 홈페이지의 상담 신청을 관리하는 Admin CMS 시스템

## 🏗 프로젝트 구조
```
admin-cms/
├── app/
│   ├── admin/
│   │   ├── dashboard/     # 대시보드 페이지
│   │   └── login/         # 로그인 페이지
│   └── api/
│       ├── auth/          # 인증 API
│       └── consultations/ # 상담 신청 API
├── src/
│   ├── components/        # React 컴포넌트
│   │   └── consultation-detail-modal.tsx
│   └── lib/
│       ├── auth.ts       # 인증 관련 함수
│       ├── db-supabase.ts # Supabase 데이터베이스 함수
│       ├── email.ts      # 이메일 발송 함수
│       └── supabase.ts   # Supabase 클라이언트 설정
└── public/               # 정적 파일
```

## 💾 데이터베이스 구조

### consultations 테이블
```sql
CREATE TABLE consultations (
  id BIGSERIAL PRIMARY KEY,

  -- 기업 정보
  company_name TEXT NOT NULL,           -- 기업명
  company_type TEXT NOT NULL,           -- 기업형태 (개인사업자/법인사업자)
  business_number TEXT,                 -- 사업자번호
  business_address TEXT,                -- 사업장 주소

  -- 신청자 정보
  applicant_name TEXT NOT NULL,         -- 신청자 성명
  phone_number TEXT NOT NULL,           -- 휴대폰
  email TEXT NOT NULL,                  -- 이메일

  -- 상담 정보
  region TEXT NOT NULL,                 -- 지역
  annual_sales TEXT,                    -- 연간 매출액
  loan_amount TEXT,                     -- 대출 요청 금액
  consultation_date TEXT,               -- 상담 희망 일시
  consultation_fields TEXT[],           -- 상담 요청 분야 (복수선택)
  consultation_content TEXT,            -- 상담 내용

  -- 시스템 필드
  privacy_agree BOOLEAN DEFAULT FALSE,  -- 개인정보 동의
  confirmed BOOLEAN DEFAULT FALSE,      -- 확인 여부
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

### RLS (Row Level Security) 정책
- **INSERT**: 누구나 가능 (상담 신청 접수)
- **SELECT/UPDATE**: 모든 사용자 가능 (임시, 추후 인증 필요)

## 🔧 주요 기능

### 1. 상담 신청 접수
- 홈페이지 폼에서 데이터 수신
- Supabase에 데이터 저장
- 이메일 알림 발송 (관리자/고객)

### 2. 관리자 대시보드
- 상담 신청 목록 조회
- 상세 정보 확인 (기업/신청자/상담 정보 구분 표시)
- 상태 관리 (확인/미확인)
- 필터링 기능

### 3. 인증 시스템
- JWT 기반 인증
- 로그인/로그아웃
- 세션 관리 (localStorage)

## ⚙️ 환경 변수 설정

### `.env.local` 파일
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# JWT Secret
JWT_SECRET=your-jwt-secret-key

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123!@#

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@usinnowave.com

# App Configuration
NEXT_PUBLIC_APP_URL=https://us-cms.vercel.app
```

## 🚀 Supabase 설정

### 1. 테이블 생성
1. Supabase 대시보드 접속
2. SQL Editor 이동
3. `supabase-new-schema.sql` 파일의 내용 실행

### 2. 환경 변수 확인
- Settings → API에서 URL과 anon key 복사
- `.env.local` 및 Vercel 환경 변수에 설정

## 📦 배포 (Vercel)

### 초기 설정
1. GitHub 저장소 연결 (yumikang/us-cms)
2. Framework Preset: Next.js
3. Root Directory: `admin-cms`
4. 환경 변수 설정

### 환경 변수 (Vercel)
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
JWT_SECRET
ADMIN_USERNAME
ADMIN_PASSWORD
NEXT_PUBLIC_APP_URL
```

### 배포 URL
- **CMS**: https://us-cms.vercel.app
- **홈페이지**: https://us.vercel.app

## 📡 API 엔드포인트

### 인증 API
```
POST /api/auth/login
Body: { username, password }
Response: { token, username }
```

### 상담 API
```
POST /api/consultations (Public)
- 상담 신청 생성
- 이메일 알림 발송

GET /api/consultations (Protected)
- 상담 목록 조회
- Query: ?confirmed=true/false

PATCH /api/consultations/[id] (Protected)
- 상담 상태 업데이트
- Body: { confirmed }
```

## 🛠 개발 명령어

```bash
# 개발 서버 실행 (포트 3001)
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm run start

# 린트 검사
npm run lint

# 타입 체크
npm run type-check
```

## 📝 주요 변경 이력

### 2025.09.18
- 프로젝트 초기 설정
- Supabase 데이터베이스 연동
- 상담 신청 폼과 DB 구조 통합
- 기업/신청자/상담 정보 구분
- 이메일 템플릿 개선
- 타입 안정성 강화 (any 타입 제거)
- Vercel 배포 완료

### 2025.09.19
- **데이터베이스 스키마 재구성**: 홈페이지 폼 구조에 맞게 전면 수정
  - 기존: name, position, company → 변경: company_name, applicant_name 등
  - consultation_fields 배열 타입으로 복수 선택 지원
- **홈페이지 연동 문제 해결**:
  - consultation-form.js API URL 수정 (localhost → production)
  - 필드 매핑 문제 수정 (individual/corporation → 개인사업자/법인사업자)
  - 상담 분야 영문 값을 한글로 변환 매핑 추가
- **CORS 문제 해결**:
  - API 엔드포인트에 CORS 헤더 추가
  - OPTIONS 메서드 핸들러 구현
  - Cross-origin 요청 허용
- **RLS 정책 조정**: 테스트를 위해 Row Level Security 비활성화
- **디버깅 도구 추가**:
  - 브라우저 콘솔 로깅 추가
  - 폼 데이터 검증 및 API 응답 추적
- **배포 구조 파악**:
  - CMS: Vercel 자동 배포
  - 홈페이지: 수동 배포 필요 (FTP/SFTP)

## 🔍 문제 해결 가이드

### CORS 에러 (해결 완료)
```javascript
// API Route에 CORS 헤더 추가 - /app/api/consultations/route.ts
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
```

### 홈페이지-CMS 연동 문제
1. **필드 매핑 불일치**:
   - 문제: 폼의 영문 값 vs DB의 한글 값
   - 해결: consultation-form.js에서 값 변환 로직 추가
2. **API URL 문제**:
   - 문제: localhost URL 사용
   - 해결: production URL로 변경
3. **배포 방식 차이**:
   - CMS: Vercel 자동 배포
   - 홈페이지: 수동 FTP 업로드 필요

### 빌드 에러
- TypeScript 타입 체크: `npm run type-check`
- 의존성 버전 확인: `npm list`
- 환경 변수 설정 확인

### 데이터베이스 연결 실패
1. Supabase URL/Key 확인
2. RLS 정책 확인
3. 테이블 구조 확인
4. 네트워크 설정 확인

### 로그인 문제
- 기본 계정: `admin` / `admin123!@#`
- Vercel 환경 변수 확인
- JWT_SECRET 설정 확인

## 🚀 배포 및 업데이트 프로세스

### CMS 배포 (자동)
1. 코드 변경 후 GitHub에 푸시
2. Vercel이 자동으로 빌드 및 배포
3. https://us-cms.vercel.app 에서 확인

### 홈페이지 업데이트 (수동)
1. `/js/consultation-form.js` 파일 수정
2. FTP/SFTP로 서버에 업로드
3. https://www.usiw.kr 에서 확인

### 환경 변수 관리
- Vercel: Dashboard에서 Environment Variables 설정
- 로컬: `.env.local` 파일 사용 (git 제외)

## 🔧 현재 상태 및 남은 작업

### ✅ 완료된 작업
- CMS 기본 기능 구현 및 배포
- 데이터베이스 스키마 설계 및 구축
- 홈페이지 폼과 API 연동 구조 완성
- CORS 문제 해결
- 필드 매핑 문제 해결
- 디버깅 도구 추가

### ⏳ 진행 중 작업
- 홈페이지 서버에 수정된 JS 파일 업로드
- 상담 신청 폼 최종 테스트

### 📋 향후 개선사항
- RLS 정책 재활성화 및 보안 강화
- 이메일 발송 기능 활성화
- 관리자 계정 관리 시스템
- 상담 신청 통계 대시보드

## 🔒 보안 고려사항

### 1. 환경 변수 관리
- 민감한 정보는 환경 변수로 관리
- 프로덕션과 개발 환경 분리
- `.env.local`은 절대 git에 커밋하지 않음

### 2. 인증/인가
- JWT 토큰 검증
- API 라우트 보호
- 세션 만료 처리

### 3. 데이터 검증
- 입력 데이터 유효성 검사
- SQL Injection 방지 (Supabase 자동 처리)
- XSS 방지

### 4. HTTPS
- Vercel 자동 SSL 인증서
- 보안 헤더 설정 (vercel.json)

## 📚 참고 자료

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## 📧 연락처

문의사항이 있으시면 아래로 연락주세요:
- Email: admin@usinnowave.com
- GitHub: https://github.com/yumikang/us-cms

---

© 2025 US INNOWAVE. All rights reserved.