-- Row Level Security (RLS) 정책 설정
-- 이 SQL을 Supabase SQL Editor에서 실행해주세요

-- RLS 활성화
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- 누구나 상담 신청 가능 (public 접근)
CREATE POLICY "Enable insert for anyone" ON consultations
  FOR INSERT WITH CHECK (true);

-- 인증된 사용자만 읽기 가능 (관리자)
CREATE POLICY "Enable read access for authenticated users" ON consultations
  FOR SELECT USING (auth.role() = 'authenticated');

-- 인증된 사용자만 수정 가능 (관리자)
CREATE POLICY "Enable update for authenticated users" ON consultations
  FOR UPDATE USING (auth.role() = 'authenticated');

-- 정책 확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'consultations';