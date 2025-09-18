# US INNOWAVE Admin CMS 개발 문서

## 📋 프로젝트 개요

### 프로젝트 정보
- **프로젝트명**: US INNOWAVE Admin CMS
- **개발 기간**: 2025년 9월 18일
- **기술 스택**: Next.js 14, TypeScript, Supabase, Tailwind CSS, shadcn/ui
- **데이터베이스**: Supabase PostgreSQL

### 주요 기능
1. 상담 신청 관리 시스템
2. 관리자 인증 시스템 (JWT)
3. 실시간 데이터 조회 및 상태 관리
4. 이메일 알림 시스템 (Nodemailer)

---

## 🏗️ 시스템 아키텍처

### 디렉토리 구조
```
admin-cms/
├── app/                      # Next.js App Router
│   ├── admin/               # 관리자 페이지
│   │   ├── dashboard/      # 대시보드
│   │   └── login/          # 로그인
│   └── api/                # API Routes
│       ├── auth/           # 인증 API
│       └── consultations/  # 상담 API
├── src/
│   ├── components/         # React 컴포넌트
│   │   └── ui/            # shadcn/ui 컴포넌트
│   └── lib/               # 유틸리티 및 라이브러리
│       ├── auth.ts        # 인증 로직
│       ├── db-supabase.ts # Supabase 연동
│       ├── email.ts       # 이메일 서비스
│       └── supabase.ts    # Supabase 클라이언트
├── supabase-*.sql         # SQL 스키마 파일들
└── middleware.ts          # Next.js 미들웨어
```

### 기술 스택 상세

#### Frontend
- **Next.js 14.2.32**: App Router 사용
- **TypeScript**: 엄격한 타입 체크 (no any)
- **Tailwind CSS**: 커스텀 디자인 시스템
- **shadcn/ui**: UI 컴포넌트 라이브러리

#### Backend
- **Supabase**: PostgreSQL 데이터베이스
- **JWT**: 인증 토큰 관리
- **Nodemailer**: 이메일 서비스

#### 디자인 원칙
- **Container Width**: 1450px 고정
- **No Shadows**: 플랫 디자인
- **No Border Radius**: 직각 디자인
- **Responsive Grid**: 반응형 그리드 시스템
- **REM Units**: 폰트 크기 시스템

---

## 💾 데이터베이스 설계

### consultations 테이블
```sql
CREATE TABLE consultations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,          -- 신청자 이름
  company TEXT NOT NULL,        -- 회사명
  position TEXT NOT NULL,       -- 직책
  phone TEXT NOT NULL,          -- 연락처
  email TEXT NOT NULL,          -- 이메일
  service TEXT NOT NULL,        -- 서비스 유형
  message TEXT NOT NULL,        -- 상담 내용
  confirmed BOOLEAN DEFAULT FALSE, -- 확인 여부
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

### Row Level Security (RLS) 정책
```sql
-- 모든 작업 허용 (테스트용)
CREATE POLICY "allow_all" ON consultations
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

> ⚠️ **주의**: 프로덕션 환경에서는 적절한 보안 정책으로 변경 필요

---

## 🔌 API 엔드포인트

### 인증 API

#### POST `/api/auth/login`
로그인 및 JWT 토큰 발급

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "로그인에 성공했습니다.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiI...",
    "username": "admin"
  }
}
```

### 상담 API

#### POST `/api/consultations`
새 상담 신청 생성 (Public)

**Request:**
```json
{
  "name": "홍길동",
  "company": "테스트회사",
  "position": "개발자",
  "phone": "010-1234-5678",
  "email": "test@example.com",
  "service": "웹개발",
  "message": "상담 내용입니다."
}
```

#### GET `/api/consultations`
상담 목록 조회 (인증 필요)

**Headers:**
```
Authorization: Bearer [JWT_TOKEN]
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "total": 10
}
```

#### GET `/api/consultations/[id]`
특정 상담 조회 (인증 필요)

#### PATCH `/api/consultations/[id]`
상담 상태 업데이트 (인증 필요)

**Request:**
```json
{
  "confirmed": true
}
```

---

## 🚀 설치 및 실행

### 1. 프로젝트 클론
```bash
git clone git@github.com:yumikang/us.git
cd us/admin-cms
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env.local` 파일 생성:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# JWT Secret
JWT_SECRET=your-jwt-secret-key

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@usinnowave.com
```

### 4. Supabase 설정
1. [Supabase](https://supabase.com) 계정 생성
2. 새 프로젝트 생성
3. SQL Editor에서 `supabase-schema.sql` 실행
4. RLS 정책 설정 (`supabase-simple-policy.sql` 실행)
5. API 키 복사하여 환경 변수에 설정

### 5. 개발 서버 실행
```bash
npm run dev
```

http://localhost:3001 에서 확인

---

## 🔐 인증 시스템

### JWT 토큰 구조
```typescript
interface JWTPayload {
  username: string;
  role: 'admin';
  iat: number;  // 발급 시간
  exp: number;  // 만료 시간 (24시간)
}
```

### 미들웨어 보호
```typescript
// middleware.ts
const protectedPaths = ['/admin/dashboard'];
```

관리자 페이지는 자동으로 로그인 페이지로 리다이렉트

---

## 📱 UI/UX 가이드

### 컴포넌트 스타일링
- **Container**: 1450px 고정 너비
- **Cards**: 그림자 없음, 테두리만 사용
- **Buttons**: border-radius 제거
- **Typography**: REM 단위 사용
- **Colors**:
  - Primary: Blue (#3B82F6)
  - Secondary: Gray (#6B7280)
  - Success: Green (#10B981)
  - Error: Red (#EF4444)

### 반응형 브레이크포인트
```css
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
```

---

## 🧪 테스트

### API 테스트 예제

#### 1. 로그인 테스트
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

#### 2. 상담 신청 테스트
```bash
curl -X POST http://localhost:3001/api/consultations \
  -H "Content-Type: application/json" \
  -d '{
    "name":"테스트",
    "company":"회사",
    "position":"직책",
    "phone":"010-0000-0000",
    "email":"test@test.com",
    "service":"서비스",
    "message":"메시지"
  }'
```

#### 3. 상담 목록 조회
```bash
curl http://localhost:3001/api/consultations \
  -H "Authorization: Bearer [YOUR_JWT_TOKEN]"
```

---

## 📝 개발 히스토리

### 2025년 9월 18일

#### Phase 1: 초기 설정
- Next.js 14 프로젝트 생성
- TypeScript 엄격 모드 설정
- Tailwind CSS 및 shadcn/ui 설정
- 플랫 디자인 시스템 구현

#### Phase 2: 백엔드 구현
- SQLite 데이터베이스 초기 구현
- JWT 인증 시스템 구축
- API 라우트 구현 (consultations CRUD)
- 이메일 서비스 연동

#### Phase 3: 프론트엔드 구현
- 관리자 로그인 페이지
- 대시보드 페이지
- 상담 목록 테이블
- 상담 상세 모달
- 상태 관리 시스템

#### Phase 4: Supabase 마이그레이션
- PostgreSQL 스키마 생성
- RLS 정책 설정
- 비동기 데이터베이스 함수 구현
- API 연동 및 테스트

#### Phase 5: 디버깅 및 최적화
- 인증 오류 해결 (bcrypt → plain text)
- RLS 정책 문제 해결
- 한글 정책명 이슈 해결
- 환경 변수 최적화

---

## 🐛 트러블슈팅

### 1. 로그인 실패 문제
**증상**: "잘못된 사용자명 또는 비밀번호입니다" 오류

**원인**: bcrypt 해싱 문제 및 특수문자 처리 오류

**해결**:
```typescript
// 개발 환경에서 평문 비교로 변경
if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
  // 로그인 성공
}
```

### 2. Supabase RLS 정책 오류
**증상**: "new row violates row-level security policy"

**원인**: 한글 정책명 및 역할 설정 충돌

**해결**:
```sql
-- 모든 정책 삭제 후 재생성
DROP POLICY IF EXISTS "기존정책명" ON consultations;
CREATE POLICY "allow_all" ON consultations
  FOR ALL USING (true) WITH CHECK (true);
```

### 3. TypeScript any 타입 오류
**증상**: 빌드 시 any 타입 사용 오류

**원인**: 엄격한 TypeScript 설정

**해결**: 모든 any 타입을 구체적인 타입으로 변경

---

## 🔄 향후 개선 사항

### 보안 강화
- [ ] RLS 정책 세분화
- [ ] bcrypt 암호화 재적용
- [ ] Rate limiting 구현
- [ ] CORS 설정 강화

### 기능 추가
- [ ] 상담 검색 기능
- [ ] 페이지네이션
- [ ] 엑셀 다운로드
- [ ] 상담 통계 대시보드
- [ ] 실시간 알림

### 성능 최적화
- [ ] 데이터베이스 인덱싱
- [ ] 이미지 최적화
- [ ] 코드 스플리팅
- [ ] 캐싱 전략

### UI/UX 개선
- [ ] 다크 모드
- [ ] 모바일 최적화
- [ ] 접근성 향상
- [ ] 다국어 지원

---

## 📚 참고 자료

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 📞 문의

US INNOWAVE 개발팀
- Email: admin@usinnowave.com
- GitHub: https://github.com/yumikang/us

---

*Last Updated: 2025년 9월 18일*