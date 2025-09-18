-- 먼저 현재 존재하는 모든 정책 확인
SELECT policyname FROM pg_policies WHERE tablename = 'consultations';

-- 모든 정책 삭제 (한글 이름 포함)
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN
        SELECT policyname
        FROM pg_policies
        WHERE tablename = 'consultations'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON consultations', pol.policyname);
    END LOOP;
END $$;

-- 정책이 모두 삭제되었는지 확인
SELECT COUNT(*) as "남은 정책 수" FROM pg_policies WHERE tablename = 'consultations';

-- 새로운 정책 생성
CREATE POLICY "public_insert" ON consultations
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "auth_select" ON consultations
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "auth_update" ON consultations
  FOR UPDATE TO authenticated USING (true);

-- 최종 확인
SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'consultations';