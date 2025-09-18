import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, generateToken } from '@/lib/auth';

// POST /api/auth/login - Admin login
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: '사용자명과 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Verify credentials
    const isValid = await verifyCredentials(body.username, body.password);

    if (!isValid) {
      return NextResponse.json(
        { error: '잘못된 사용자명 또는 비밀번호입니다.' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(body.username);

    // Return success response with token
    return NextResponse.json({
      success: true,
      message: '로그인에 성공했습니다.',
      data: {
        token,
        username: body.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: '로그인 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}