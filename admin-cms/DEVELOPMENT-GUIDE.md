# US INNOWAVE Admin CMS 개발 가이드

## 📋 프로젝트 개요

### 프로젝트 정보
- **프로젝트명**: US INNOWAVE Admin CMS
- **개발 기간**: 2025년 9월 18일
- **기술 스택**: Next.js 14, TypeScript, Supabase, Tailwind CSS, shadcn/ui
- **데이터베이스**: Supabase PostgreSQL
- **배포**: Vercel
- **저장소**: https://github.com/yumikang/us-cms

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

## 🔍 문제 해결 가이드

### CORS 에러
```javascript
// API Route에 CORS 헤더 추가
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}
```

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