-- 모든 RLS 정책 확인
SELECT
    policyname as "정책 이름",
    cmd as "명령어",
    roles as "역할",
    CASE permissive
        WHEN true THEN '허용'
        ELSE '거부'
    END as "권한 타입",
    qual as "조건",
    with_check as "체크 조건"
FROM pg_policies
WHERE tablename = 'consultations'
ORDER BY cmd;