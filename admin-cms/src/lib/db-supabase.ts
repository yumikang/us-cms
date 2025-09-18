import { supabase, Consultation, CreateConsultationInput } from './supabase';

// Create a new consultation
export async function createConsultation(input: CreateConsultationInput): Promise<number | null> {
  const { data, error } = await supabase
    .from('consultations')
    .insert([input])
    .select('id')
    .single();

  if (error) {
    console.error('Error creating consultation:', error);
    throw new Error('상담 신청 생성 중 오류가 발생했습니다.');
  }

  return data?.id || null;
}

// Get all consultations with optional filtering
export async function getConsultations(confirmed?: boolean): Promise<Consultation[]> {
  let query = supabase
    .from('consultations')
    .select('*')
    .order('created_at', { ascending: false });

  if (confirmed !== undefined) {
    query = query.eq('confirmed', confirmed);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching consultations:', error);
    throw new Error('상담 목록 조회 중 오류가 발생했습니다.');
  }

  return data || [];
}

// Get a single consultation by ID
export async function getConsultationById(id: number): Promise<Consultation | null> {
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    console.error('Error fetching consultation:', error);
    throw new Error('상담 정보 조회 중 오류가 발생했습니다.');
  }

  return data;
}

// Update consultation confirmed status
export async function updateConsultationStatus(id: number, confirmed: boolean): Promise<boolean> {
  const { error } = await supabase
    .from('consultations')
    .update({ confirmed })
    .eq('id', id);

  if (error) {
    console.error('Error updating consultation status:', error);
    throw new Error('상담 상태 변경 중 오류가 발생했습니다.');
  }

  return true;
}