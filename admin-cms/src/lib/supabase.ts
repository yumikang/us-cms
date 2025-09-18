import { createClient } from '@supabase/supabase-js';

// Supabase 환경 변수
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database 타입 정의
export interface Database {
  public: {
    Tables: {
      consultations: {
        Row: {
          id: number;
          // 기업 정보
          company_name: string;
          company_type: string;
          business_number: string | null;
          business_address: string | null;
          // 신청자 정보
          applicant_name: string;
          phone_number: string;
          email: string;
          // 상담 정보
          region: string;
          annual_sales: string | null;
          loan_amount: string | null;
          consultation_date: string | null;
          consultation_fields: string[] | null;
          consultation_content: string | null;
          // 시스템 필드
          privacy_agree: boolean;
          confirmed: boolean;
          created_at: string;
        };
        Insert: {
          id?: number;
          company_name: string;
          company_type: string;
          business_number?: string;
          business_address?: string;
          applicant_name: string;
          phone_number: string;
          email: string;
          region: string;
          annual_sales?: string;
          loan_amount?: string;
          consultation_date?: string;
          consultation_fields?: string[];
          consultation_content?: string;
          privacy_agree?: boolean;
          confirmed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          company_name?: string;
          company_type?: string;
          business_number?: string;
          business_address?: string;
          applicant_name?: string;
          phone_number?: string;
          email?: string;
          region?: string;
          annual_sales?: string;
          loan_amount?: string;
          consultation_date?: string;
          consultation_fields?: string[];
          consultation_content?: string;
          privacy_agree?: boolean;
          confirmed?: boolean;
          created_at?: string;
        };
      };
    };
  };
}

export type Consultation = Database['public']['Tables']['consultations']['Row'];
export type CreateConsultationInput = Omit<Database['public']['Tables']['consultations']['Insert'], 'id' | 'created_at' | 'confirmed'>;