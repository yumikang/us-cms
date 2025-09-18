# US INNOWAVE Admin CMS

상담 신청 관리 시스템 (Consultation Management System)

## 기능

- 상담 신청 폼 API 제공
- 관리자 대시보드 (상담 목록 조회, 상태 관리)
- 이메일 알림 시스템
- JWT 기반 인증

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Database**: SQLite
- **Authentication**: JWT
- **Email**: Nodemailer
- **UI Components**: shadcn/ui (Flat Design)
- **Styling**: Tailwind CSS

## 설치

```bash
# 의존성 설치
npm install --legacy-peer-deps

# 환경 변수 설정
cp .env.local .env.local
# .env.local 파일을 열어서 이메일 설정과 JWT 시크릿을 수정하세요
```

## 환경 변수 설정

`.env.local` 파일:

```env
# 이메일 설정
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com  # 실제 이메일로 변경
EMAIL_PASS=your-app-password     # Gmail 앱 비밀번호로 변경
ADMIN_EMAIL=admin@usinnowave.com # 관리자 이메일로 변경

# JWT 시크릿 (프로덕션에서는 반드시 변경)
JWT_SECRET=your-jwt-secret-key-change-this-in-production

# 관리자 계정 (프로덕션에서는 반드시 변경)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123!@#

# 앱 URL
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## 개발 서버 실행

```bash
# 개발 서버 시작 (포트 3001)
npm run dev
```

- 관리자 패널: http://localhost:3001/admin
- API 엔드포인트: http://localhost:3001/api/consultations

## API 엔드포인트

### 1. 상담 신청 접수 (Public)

```
POST /api/consultations
Content-Type: application/json

{
  "name": "이름",
  "company": "회사명",
  "position": "직책",
  "phone": "연락처",
  "email": "이메일",
  "service": "서비스",
  "message": "상담 내용"
}
```

### 2. 상담 목록 조회 (Protected)

```
GET /api/consultations
Authorization: Bearer {JWT_TOKEN}

Query Parameters:
- confirmed: true/false (옵션)
```

### 3. 상담 상태 변경 (Protected)

```
PATCH /api/consultations/{id}
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json

{
  "confirmed": true/false
}
```

### 4. 관리자 로그인

```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123!@#"
}
```

## 프로덕션 배포

### 빌드

```bash
# 프로덕션 빌드
npm run build
```

### 환경 변수 수정

프로덕션 환경에서는 다음 항목을 반드시 변경하세요:

1. `JWT_SECRET`: 강력한 랜덤 문자열로 변경
2. `ADMIN_USERNAME` / `ADMIN_PASSWORD`: 안전한 계정 정보로 변경
3. `EMAIL_USER` / `EMAIL_PASS`: 실제 이메일 계정 정보
4. `ADMIN_EMAIL`: 실제 관리자 이메일
5. `NEXT_PUBLIC_APP_URL`: 실제 도메인 URL

### PM2로 실행 (권장)

```bash
# PM2 설치 (글로벌)
npm install -g pm2

# PM2로 실행
pm2 start npm --name "admin-cms" -- start

# 로그 확인
pm2 logs admin-cms

# 재시작
pm2 restart admin-cms

# 중지
pm2 stop admin-cms
```

### 시스템 서비스로 등록

```bash
# PM2 시작 스크립트 생성
pm2 startup
pm2 save
```

## 보안 고려사항

1. **HTTPS 사용**: 프로덕션에서는 반드시 HTTPS 사용
2. **환경 변수 보호**: `.env.local` 파일은 절대 Git에 커밋하지 마세요
3. **정기 백업**: SQLite 데이터베이스 파일 (`consultations.db`) 정기 백업
4. **로그 모니터링**: 비정상 접근 시도 모니터링
5. **Rate Limiting**: 프로덕션에서는 API Rate Limiting 구현 권장

## 데이터베이스 관리

데이터베이스 파일 위치: `./consultations.db`

### 백업

```bash
# 데이터베이스 백업
cp consultations.db consultations.db.backup
```

### 복원

```bash
# 데이터베이스 복원
cp consultations.db.backup consultations.db
```

## 문제 해결

### 이메일이 발송되지 않을 때

1. Gmail 앱 비밀번호 생성:
   - Google 계정 설정 → 보안 → 2단계 인증 활성화
   - 앱 비밀번호 생성하여 `EMAIL_PASS`에 사용

2. SMTP 설정 확인:
   - 다른 이메일 서비스 사용 시 `EMAIL_HOST`, `EMAIL_PORT` 수정

### 포트 충돌

기본 포트 3001이 사용 중인 경우:
- `package.json`의 `scripts`에서 포트 번호 수정
- `NEXT_PUBLIC_APP_URL` 환경 변수도 함께 수정

## 디렉토리 구조

```
admin-cms/
├── app/                      # Next.js App Router
│   ├── api/                 # API 라우트
│   │   ├── auth/           # 인증 API
│   │   └── consultations/  # 상담 API
│   └── admin/              # 관리자 페이지
│       ├── login/          # 로그인
│       └── dashboard/      # 대시보드
├── src/
│   ├── components/         # 컴포넌트
│   │   └── ui/            # shadcn/ui 컴포넌트
│   └── lib/               # 유틸리티
│       ├── auth.ts        # 인증 로직
│       ├── db.ts          # 데이터베이스
│       └── email.ts       # 이메일 서비스
├── consultations.db        # SQLite 데이터베이스
└── .env.local             # 환경 변수
```

## 라이선스

Private Project - US INNOWAVE