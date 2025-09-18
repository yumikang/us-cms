-- 1단계: 기존 정책들 모두 삭제
DROP POLICY IF EXISTS "Enable insert for anyone" ON consultations;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON consultations;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON consultations;
DROP POLICY IF EXISTS "인증된 사용자에 대한 읽기 액세스 활성화" ON consultations;
DROP POLICY IF EXISTS "누구나 삽입 가능" ON consultations;

-- 2단계: 새로운 정책 생성 (anon 역할에 대한 INSERT 허용)
CREATE POLICY "Allow public insert" ON consultations
  FOR INSERT TO anon WITH CHECK (true);

-- 3단계: 인증된 사용자에 대한 SELECT 허용
CREATE POLICY "Allow authenticated select" ON consultations
  FOR SELECT TO authenticated USING (true);

-- 4단계: 인증된 사용자에 대한 UPDATE 허용
CREATE POLICY "Allow authenticated update" ON consultations
  FOR UPDATE TO authenticated USING (true);

-- 5단계: 정책 확인
SELECT policyname, roles, cmd, permissive
FROM pg_policies
WHERE tablename = 'consultations';