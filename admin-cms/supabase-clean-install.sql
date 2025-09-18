-- ============================================
-- 1단계: 기존 정책 모두 삭제
-- ============================================

-- 현재 존재하는 정책 확인
SELECT policyname FROM pg_policies WHERE tablename = 'consultations';

-- 모든 정책 강제 삭제
DROP POLICY IF EXISTS "Enable insert for anyone" ON consultations;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON consultations;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON consultations;
DROP POLICY IF EXISTS "인증된 사용자에 대한 읽기 액세스 활성화" ON consultations;
DROP POLICY IF EXISTS "누구나 삽입 가능" ON consultations;
DROP POLICY IF EXISTS "Allow public insert" ON consultations;
DROP POLICY IF EXISTS "Allow authenticated select" ON consultations;
DROP POLICY IF EXISTS "Allow authenticated update" ON consultations;
DROP POLICY IF EXISTS "public_insert" ON consultations;
DROP POLICY IF EXISTS "auth_select" ON consultations;
DROP POLICY IF EXISTS "auth_update" ON consultations;

-- ============================================
-- 2단계: RLS 활성화 확인
-- ============================================
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3단계: 새로운 정책 생성 (깨끗하게!)
-- ============================================

-- 누구나 상담 신청 가능
CREATE POLICY "public_insert_policy" ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 인증된 사용자만 조회 가능
CREATE POLICY "auth_select_policy" ON consultations
  FOR SELECT
  TO authenticated
  USING (true);

-- 인증된 사용자만 수정 가능
CREATE POLICY "auth_update_policy" ON consultations
  FOR UPDATE
  TO authenticated
  USING (true);

-- ============================================
-- 4단계: 최종 확인
-- ============================================
SELECT
  policyname as "정책 이름",
  cmd as "명령어",
  roles as "역할"
FROM pg_policies
WHERE tablename = 'consultations'
ORDER BY cmd;