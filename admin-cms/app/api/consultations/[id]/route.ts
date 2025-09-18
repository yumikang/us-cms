import { NextRequest, NextResponse } from 'next/server';
import { getConsultationById, updateConsultationStatus } from '@/lib/db-supabase';
import { isAuthenticated } from '@/lib/auth';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/consultations/[id] - Get single consultation (protected)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const authorization = request.headers.get('authorization');
    const authenticated = await isAuthenticated(authorization);

    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse ID
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid consultation ID' },
        { status: 400 }
      );
    }

    // Get consultation from database
    const consultation = await getConsultationById(id);

    if (!consultation) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      );
    }

    // Return response
    return NextResponse.json({
      success: true,
      data: consultation
    });
  } catch (error) {
    console.error('Get consultation error:', error);
    return NextResponse.json(
      { error: '상담 정보 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// PATCH /api/consultations/[id] - Update consultation status (protected)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const authorization = request.headers.get('authorization');
    const authenticated = await isAuthenticated(authorization);

    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse ID
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid consultation ID' },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate confirmed field
    if (typeof body.confirmed !== 'boolean') {
      return NextResponse.json(
        { error: 'Field "confirmed" must be a boolean value' },
        { status: 400 }
      );
    }

    // Check if consultation exists
    const consultation = await getConsultationById(id);
    if (!consultation) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      );
    }

    // Update consultation status
    const updated = await updateConsultationStatus(id, body.confirmed);

    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to update consultation status' },
        { status: 500 }
      );
    }

    // Get updated consultation
    const updatedConsultation = await getConsultationById(id);

    // Return response
    return NextResponse.json({
      success: true,
      message: `상담 상태가 ${body.confirmed ? '확인됨' : '미확인'}으로 변경되었습니다.`,
      data: updatedConsultation
    });
  } catch (error) {
    console.error('Update consultation error:', error);
    return NextResponse.json(
      { error: '상담 상태 변경 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}