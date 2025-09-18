import nodemailer from 'nodemailer';

// Email configuration from environment variables
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || ''
  }
};

// Admin email to receive notifications
const adminEmail = process.env.ADMIN_EMAIL || 'admin@usinnowave.com';

// Create reusable transporter object
const transporter = nodemailer.createTransport(emailConfig);

export interface EmailData {
  // 기업 정보
  company_name: string;
  company_type: string;
  business_number?: string;
  business_address?: string;
  // 신청자 정보
  applicant_name: string;
  phone_number: string;
  email: string;
  // 상담 정보
  region: string;
  annual_sales?: string;
  loan_amount?: string;
  consultation_date?: string;
  consultation_fields?: string[];
  consultation_content?: string;
  // 시스템 필드
  privacy_agree?: boolean;
}

// Send notification email to admin
export async function sendAdminNotification(data: EmailData): Promise<boolean> {
  try {
    const mailOptions = {
      from: emailConfig.auth.user,
      to: adminEmail,
      subject: `[상담신청] ${data.company_name} - ${data.applicant_name}님`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #f8f9fa;
                padding: 20px;
                margin-bottom: 20px;
              }
              .header h1 {
                margin: 0;
                color: #212529;
                font-size: 24px;
              }
              .section {
                background-color: #ffffff;
                padding: 20px;
                border: 1px solid #dee2e6;
                margin-bottom: 20px;
              }
              .section h2 {
                color: #495057;
                font-size: 18px;
                margin-bottom: 15px;
                border-bottom: 2px solid #f8f9fa;
                padding-bottom: 5px;
              }
              .info-row {
                margin-bottom: 10px;
                display: flex;
                border-bottom: 1px solid #f8f9fa;
                padding-bottom: 8px;
              }
              .info-label {
                font-weight: 600;
                width: 140px;
                color: #495057;
              }
              .info-value {
                flex: 1;
                color: #212529;
              }
              .message-box {
                background-color: #f8f9fa;
                padding: 15px;
                margin-top: 10px;
                border: 1px solid #dee2e6;
                white-space: pre-wrap;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #dee2e6;
                text-align: center;
                color: #6c757d;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>새로운 상담 신청이 접수되었습니다</h1>
              </div>

              <!-- 기업 정보 섹션 -->
              <div class="section">
                <h2>기업 정보</h2>
                <div class="info-row">
                  <span class="info-label">기업명:</span>
                  <span class="info-value">${data.company_name}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">기업형태:</span>
                  <span class="info-value">${data.company_type}</span>
                </div>
                ${data.business_number ? `
                <div class="info-row">
                  <span class="info-label">사업자번호:</span>
                  <span class="info-value">${data.business_number}</span>
                </div>
                ` : ''}
                ${data.business_address ? `
                <div class="info-row">
                  <span class="info-label">사업장 주소:</span>
                  <span class="info-value">${data.business_address}</span>
                </div>
                ` : ''}
              </div>

              <!-- 신청자 정보 섹션 -->
              <div class="section">
                <h2>신청자 정보</h2>
                <div class="info-row">
                  <span class="info-label">신청자 성명:</span>
                  <span class="info-value">${data.applicant_name}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">휴대폰:</span>
                  <span class="info-value">${data.phone_number}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">이메일:</span>
                  <span class="info-value">${data.email}</span>
                </div>
              </div>

              <!-- 상담 정보 섹션 -->
              <div class="section">
                <h2>상담 정보</h2>
                <div class="info-row">
                  <span class="info-label">지역:</span>
                  <span class="info-value">${data.region}</span>
                </div>
                ${data.annual_sales ? `
                <div class="info-row">
                  <span class="info-label">연간 매출액:</span>
                  <span class="info-value">${data.annual_sales}</span>
                </div>
                ` : ''}
                ${data.loan_amount ? `
                <div class="info-row">
                  <span class="info-label">대출 요청 금액:</span>
                  <span class="info-value">${data.loan_amount}</span>
                </div>
                ` : ''}
                ${data.consultation_date ? `
                <div class="info-row">
                  <span class="info-label">상담 희망 일시:</span>
                  <span class="info-value">${data.consultation_date}</span>
                </div>
                ` : ''}
                ${data.consultation_fields && data.consultation_fields.length > 0 ? `
                <div class="info-row">
                  <span class="info-label">상담 요청 분야:</span>
                  <span class="info-value">${data.consultation_fields.join(', ')}</span>
                </div>
                ` : ''}
                ${data.consultation_content ? `
                <div>
                  <div style="font-weight: 600; color: #495057; margin-bottom: 10px;">상담 내용:</div>
                  <div class="message-box">${data.consultation_content}</div>
                </div>
                ` : ''}
              </div>

              <div class="footer">
                <p>이 메일은 US INNOWAVE 상담 신청 시스템에서 자동으로 발송되었습니다.</p>
                <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/admin/dashboard">관리자 대시보드에서 확인하기</a></p>
              </div>
            </div>
          </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    return false;
  }
}

// Send confirmation email to client
export async function sendClientConfirmation(data: EmailData): Promise<boolean> {
  try {
    const mailOptions = {
      from: emailConfig.auth.user,
      to: data.email,
      subject: 'US INNOWAVE - 상담 신청이 접수되었습니다',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.8;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 30px;
                text-align: center;
                margin-bottom: 30px;
              }
              .header h1 {
                margin: 0;
                color: #ffffff;
                font-size: 28px;
              }
              .content {
                background-color: #ffffff;
                padding: 30px;
                border: 1px solid #e9ecef;
              }
              .greeting {
                font-size: 18px;
                margin-bottom: 20px;
                color: #212529;
              }
              .summary {
                background-color: #f8f9fa;
                padding: 20px;
                margin: 20px 0;
                border-left: 4px solid #667eea;
              }
              .summary h2 {
                margin-top: 0;
                color: #495057;
                font-size: 16px;
              }
              .info-row {
                margin-bottom: 8px;
                color: #495057;
              }
              .info-label {
                font-weight: 600;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #dee2e6;
                text-align: center;
                color: #6c757d;
                font-size: 14px;
              }
              .contact-info {
                background-color: #f8f9fa;
                padding: 15px;
                margin-top: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>상담 신청이 접수되었습니다</h1>
              </div>

              <div class="content">
                <div class="greeting">
                  안녕하세요, ${data.applicant_name}님
                </div>

                <p>US INNOWAVE에 상담을 신청해 주셔서 감사합니다. 귀하의 상담 신청이 성공적으로 접수되었습니다.</p>

                <div class="summary">
                  <h2>신청 내용</h2>
                  <div class="info-row">
                    <span class="info-label">기업명:</span> ${data.company_name}
                  </div>
                  <div class="info-row">
                    <span class="info-label">신청자:</span> ${data.applicant_name}
                  </div>
                  <div class="info-row">
                    <span class="info-label">연락처:</span> ${data.phone_number}
                  </div>
                  ${data.consultation_date ? `
                  <div class="info-row">
                    <span class="info-label">희망 상담 일시:</span> ${data.consultation_date}
                  </div>
                  ` : ''}
                </div>

                <p>담당자가 빠른 시일 내에 연락드릴 예정입니다. 추가 문의사항이 있으시면 아래 연락처로 문의해 주시기 바랍니다.</p>

                <div class="contact-info">
                  <strong>고객센터</strong><br>
                  전화: 1234-5678<br>
                  이메일: support@usinnowave.com
                </div>
              </div>

              <div class="footer">
                <p>이 메일은 발신 전용입니다. 회신은 처리되지 않습니다.</p>
                <p>© 2025 US INNOWAVE. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Client confirmation email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send client confirmation email:', error);
    return false;
  }
}