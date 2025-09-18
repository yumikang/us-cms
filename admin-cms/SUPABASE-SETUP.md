# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. https://supabase.com 에서 계정 생성
2. "New Project" 클릭
3. 프로젝트 이름, 비밀번호 설정
4. 지역 선택 (한국의 경우 "Northeast Asia (Seoul)" 권장)

## 2. 데이터베이스 테이블 생성

Supabase 대시보드에서:
1. **SQL Editor** 탭으로 이동
2. `supabase-schema.sql` 파일의 내용을 복사하여 실행
3. 또는 **Table Editor**에서 수동으로 생성:

### consultations 테이블 스키마
```sql
CREATE TABLE consultations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  confirmed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

## 3. Row Level Security (RLS) 설정

### 정책 생성
```sql
-- RLS 활성화
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- 인증된 사용자만 읽기 (관리자)
CREATE POLICY "Enable read access for authenticated users" ON consultations
  FOR SELECT USING (auth.role() = 'authenticated');

-- 누구나 상담 신청 가능 (public)
CREATE POLICY "Enable insert for anyone" ON consultations
  FOR INSERT WITH CHECK (true);

-- 인증된 사용자만 수정 가능 (관리자)
CREATE POLICY "Enable update for authenticated users" ON consultations
  FOR UPDATE USING (auth.role() = 'authenticated');
```

## 4. API 키 및 URL 확인

Supabase 대시보드에서:
1. **Settings** → **API** 탭으로 이동
2. 다음 정보 복사:
   - `Project URL`
   - `anon` `public` key
   - `service_role` `secret` key (선택사항)

## 5. 환경 변수 설정

`.env.local` 파일에 추가:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 6. 테스트

1. 서버 재시작: `npm run dev`
2. 상담 신청 폼 테스트
3. 관리자 패널에서 데이터 확인

## 보안 참고사항

### RLS 정책 확인
- `anon` 키로는 INSERT만 가능
- 관리자 기능은 별도 인증 필요
- 민감한 데이터 접근 제한

### 추가 보안 설정 (권장)
1. **Email 도메인 제한**: Settings → Auth → Email Auth
2. **Rate Limiting**: Settings → API → Rate Limiting
3. **CORS 설정**: Settings → API → CORS

## 데이터베이스 백업

Supabase는 자동 백업을 제공하지만, 추가 백업을 위해:
1. **Settings** → **Database** → **Backups**
2. 정기적인 SQL 덤프 생성 권장

## 모니터링

Supabase 대시보드에서 확인 가능:
- **Database** → **Tables**: 데이터 조회/편집
- **Logs**: 에러 로그 확인
- **API**: API 사용량 모니터링

## 문제 해결

### 연결 에러
1. 환경 변수 재확인
2. Supabase 프로젝트 상태 확인
3. RLS 정책 확인

### 권한 에러
- RLS 정책이 올바르게 설정되었는지 확인
- API 키가 올바른지 확인

### 성능 최적화
- 인덱스 추가 (이미 스키마에 포함됨)
- 쿼리 최적화
- Connection pooling 설정