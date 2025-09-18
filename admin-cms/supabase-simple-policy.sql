-- 모든 정책 삭제
DROP POLICY IF EXISTS "anyone_can_insert" ON consultations;
DROP POLICY IF EXISTS "auth_can_select" ON consultations;
DROP POLICY IF EXISTS "auth_can_update" ON consultations;
DROP POLICY IF EXISTS "공개_삽입" ON consultations;
DROP POLICY IF EXISTS "인증_선택" ON consultations;
DROP POLICY IF EXISTS "인증_업데이트" ON consultations;

-- RLS 비활성화 후 재활성화
ALTER TABLE consultations DISABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- 가장 단순한 정책 설정 (모든 작업 허용 - 테스트용)
CREATE POLICY "allow_all" ON consultations
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 확인
SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'consultations';