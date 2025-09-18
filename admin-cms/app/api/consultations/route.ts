import { NextRequest, NextResponse } from 'next/server';
import { createConsultation, getConsultations } from '@/lib/db-supabase';
import { CreateConsultationInput } from '@/lib/supabase';
import { sendAdminNotification, sendClientConfirmation } from '@/lib/email';
import { isAuthenticated } from '@/lib/auth';

// POST /api/consultations - Create new consultation (public)
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'companyName',
      'companyType',
      'applicantName',
      'phoneNumber',
      'email',
      'region'
    ];

    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === '') {
        return NextResponse.json(
          { error: `Field '${field}' is required` },
          { status: 400 }
        );
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Phone validation (Korean phone number format)
    const phoneRegex = /^[0-9-]+$/;
    if (body.phoneNumber && !phoneRegex.test(body.phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    // Create consultation input
    const consultationInput = {
      company_name: body.companyName?.trim() || '',
      company_type: body.companyType?.trim() || '',
      business_number: body.businessNumber?.trim() || '',
      business_address: body.businessAddress?.trim() || '',
      applicant_name: body.applicantName?.trim() || '',
      phone_number: body.phoneNumber?.trim() || '',
      email: body.email?.trim().toLowerCase() || '',
      region: body.region?.trim() || '',
      annual_sales: body.annualSales?.trim() || '',
      loan_amount: body.loanAmount?.trim() || '',
      consultation_date: body.consultationDate?.trim() || '',
      consultation_fields: body.consultationFields || [],
      consultation_content: body.consultationContent?.trim() || '',
      privacy_agree: body.privacyAgree || false,
      confirmed: false
    };

    // Save to database
    const consultationId = await createConsultation(consultationInput);

    // Send emails (non-blocking)
    Promise.all([
      sendAdminNotification(consultationInput),
      sendClientConfirmation(consultationInput)
    ]).catch(error => {
      console.error('Email sending error:', error);
      // Don't fail the request if email fails
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: '상담 신청이 성공적으로 접수되었습니다.',
        data: {
          id: consultationId
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Consultation creation error:', error);
    return NextResponse.json(
      { error: '상담 신청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// GET /api/consultations - Get consultations list (protected)
export async function GET(request: NextRequest) {
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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const confirmedParam = searchParams.get('confirmed');

    // Parse confirmed parameter
    let confirmed: boolean | undefined;
    if (confirmedParam !== null) {
      confirmed = confirmedParam === 'true';
    }

    // Get consultations from database
    const consultations = await getConsultations(confirmed);

    // Return response
    return NextResponse.json({
      success: true,
      data: consultations,
      total: consultations.length
    });
  } catch (error) {
    console.error('Get consultations error:', error);
    return NextResponse.json(
      { error: '상담 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}