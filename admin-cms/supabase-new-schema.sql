-- 기존 테이블 삭제 (주의: 기존 데이터가 있다면 백업 필요)
DROP TABLE IF EXISTS consultations;

-- 새로운 상담 신청 테이블 생성 (실제 폼에 맞춤)
CREATE TABLE consultations (
  id BIGSERIAL PRIMARY KEY,

  -- 기업 정보
  company_name TEXT NOT NULL,           -- 기업명
  company_type TEXT NOT NULL,           -- 기업형태 (개인사업자/법인사업자)
  business_number TEXT,                 -- 사업자번호
  business_address TEXT,                -- 사업장 주소

  -- 신청자 정보
  applicant_name TEXT NOT NULL,         -- 신청자 성명
  phone_number TEXT NOT NULL,           -- 휴대폰
  email TEXT NOT NULL,                  -- 이메일

  -- 상담 정보
  region TEXT NOT NULL,                 -- 지역
  annual_sales TEXT,                    -- 연간 매출액
  loan_amount TEXT,                     -- 대출 요청 금액
  consultation_date TEXT,               -- 상담 희망 일시
  consultation_fields TEXT[],           -- 상담 요청 분야 (복수선택)
  consultation_content TEXT,            -- 상담 내용

  -- 시스템 필드
  privacy_agree BOOLEAN DEFAULT FALSE,  -- 개인정보 동의
  confirmed BOOLEAN DEFAULT FALSE,      -- 확인 여부
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Row Level Security (RLS) 활성화
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- RLS 정책 생성
-- 누구나 상담 신청 가능 (public)
CREATE POLICY "Enable insert for anyone" ON consultations
  FOR INSERT WITH CHECK (true);

-- 인증된 사용자만 읽기 가능 (관리자)
CREATE POLICY "Enable read access for authenticated users" ON consultations
  FOR SELECT USING (auth.role() = 'authenticated' OR true); -- 임시로 모두 허용

-- 인증된 사용자만 수정 가능 (관리자)
CREATE POLICY "Enable update for authenticated users" ON consultations
  FOR UPDATE USING (auth.role() = 'authenticated' OR true); -- 임시로 모두 허용

-- 인덱스 추가 (성능 최적화)
CREATE INDEX idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX idx_consultations_confirmed ON consultations(confirmed);
CREATE INDEX idx_consultations_company_name ON consultations(company_name);