-- 현재 RLS 정책 상태 확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'consultations';

-- 테이블 RLS 상태 확인
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'consultations';

-- 필요한 정책이 없다면 추가 (기존 정책 삭제 후 재생성)
DROP POLICY IF EXISTS "Enable insert for anyone" ON consultations;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON consultations;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON consultations;

-- 올바른 정책 생성
CREATE POLICY "Enable insert for anyone" ON consultations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users" ON consultations
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON consultations
  FOR UPDATE USING (auth.role() = 'authenticated');

-- 정책 재확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'consultations';