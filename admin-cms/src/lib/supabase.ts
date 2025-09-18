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
          name: string;
          company: string;
          position: string;
          phone: string;
          email: string;
          service: string;
          message: string;
          confirmed: boolean;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          company: string;
          position: string;
          phone: string;
          email: string;
          service: string;
          message: string;
          confirmed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          company?: string;
          position?: string;
          phone?: string;
          email?: string;
          service?: string;
          message?: string;
          confirmed?: boolean;
          created_at?: string;
        };
      };
    };
  };
}

export type Consultation = Database['public']['Tables']['consultations']['Row'];
export type CreateConsultationInput = Omit<Database['public']['Tables']['consultations']['Insert'], 'id' | 'created_at' | 'confirmed'>;