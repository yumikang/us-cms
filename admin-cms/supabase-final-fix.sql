-- 모든 정책 강제 삭제 (한글 이름 포함)
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN
        SELECT policyname
        FROM pg_policies
        WHERE tablename = 'consultations'
    LOOP
        EXECUTE format('DROP POLICY %I ON consultations', pol.policyname);
    END LOOP;
END $$;

-- RLS는 이미 활성화되어 있으므로 다시 설정
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- 더 단순한 정책으로 설정 (public 키워드 사용)
CREATE POLICY "anyone_can_insert" ON consultations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "auth_can_select" ON consultations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth_can_update" ON consultations
  FOR UPDATE
  TO authenticated
  USING (true);

-- 확인
SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'consultations';