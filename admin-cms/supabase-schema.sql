-- Consultations 테이블 생성
CREATE TABLE IF NOT EXISTS consultations (
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

-- 인덱스 생성 (검색 성능 향상)
CREATE INDEX IF NOT EXISTS idx_consultations_confirmed ON consultations(confirmed);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_email ON consultations(email);

-- Row Level Security (RLS) 활성화
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- 정책 생성 (필요에 따라 조정)
-- Public 읽기는 불가, 인증된 사용자만 접근
CREATE POLICY "Enable read access for authenticated users" ON consultations
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for anyone" ON consultations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON consultations
  FOR UPDATE USING (auth.role() = 'authenticated');

-- 테이블 설명 추가
COMMENT ON TABLE consultations IS '상담 신청 정보';
COMMENT ON COLUMN consultations.id IS '고유 ID';
COMMENT ON COLUMN consultations.name IS '신청자 이름';
COMMENT ON COLUMN consultations.company IS '회사명';
COMMENT ON COLUMN consultations.position IS '직책';
COMMENT ON COLUMN consultations.phone IS '연락처';
COMMENT ON COLUMN consultations.email IS '이메일';
COMMENT ON COLUMN consultations.service IS '서비스 유형';
COMMENT ON COLUMN consultations.message IS '상담 내용';
COMMENT ON COLUMN consultations.confirmed IS '확인 여부';
COMMENT ON COLUMN consultations.created_at IS '신청 일시';