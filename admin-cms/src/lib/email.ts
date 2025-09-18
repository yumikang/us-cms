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
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

// Send notification email to admin
export async function sendAdminNotification(data: EmailData): Promise<boolean> {
  try {
    const mailOptions = {
      from: emailConfig.auth.user,
      to: adminEmail,
      subject: `[상담신청] ${data.company} - ${data.name}님`,
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
              .content {
                background-color: #ffffff;
                padding: 20px;
                border: 1px solid #dee2e6;
              }
              .info-row {
                margin-bottom: 15px;
                display: flex;
                border-bottom: 1px solid #f8f9fa;
                padding-bottom: 10px;
              }
              .info-label {
                font-weight: 600;
                width: 120px;
                color: #495057;
              }
              .info-value {
                flex: 1;
                color: #212529;
              }
              .message-box {
                background-color: #f8f9fa;
                padding: 15px;
                margin-top: 20px;
                border: 1px solid #dee2e6;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #dee2e6;
                text-align: center;
                color: #6c757d;
                font-size: 14px;
              }
              .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>새로운 상담 신청이 접수되었습니다</h1>
              </div>

              <div class="content">
                <div class="info-row">
                  <span class="info-label">이름:</span>
                  <span class="info-value">${data.name}</span>
                </div>

                <div class="info-row">
                  <span class="info-label">회사명:</span>
                  <span class="info-value">${data.company}</span>
                </div>

                <div class="info-row">
                  <span class="info-label">직책:</span>
                  <span class="info-value">${data.position}</span>
                </div>

                <div class="info-row">
                  <span class="info-label">연락처:</span>
                  <span class="info-value">${data.phone}</span>
                </div>

                <div class="info-row">
                  <span class="info-label">이메일:</span>
                  <span class="info-value">${data.email}</span>
                </div>

                <div class="info-row">
                  <span class="info-label">서비스:</span>
                  <span class="info-value">${data.service}</span>
                </div>

                <div class="message-box">
                  <strong>상담 내용:</strong><br>
                  ${data.message.replace(/\n/g, '<br>')}
                </div>

                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/admin" class="btn">
                  관리자 페이지에서 확인
                </a>
              </div>

              <div class="footer">
                <p>이 메일은 US INNOWAVE 상담 신청 시스템에서 자동으로 발송되었습니다.</p>
                <p>© 2024 US INNOWAVE. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        새로운 상담 신청이 접수되었습니다.

        이름: ${data.name}
        회사명: ${data.company}
        직책: ${data.position}
        연락처: ${data.phone}
        이메일: ${data.email}
        서비스: ${data.service}

        상담 내용:
        ${data.message}

        관리자 페이지에서 확인: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/admin
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

// Send confirmation email to client
export async function sendClientConfirmation(data: EmailData): Promise<boolean> {
  try {
    const mailOptions = {
      from: emailConfig.auth.user,
      to: data.email,
      subject: `[US INNOWAVE] 상담 신청이 접수되었습니다`,
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
                background-color: #007bff;
                color: white;
                padding: 30px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
              }
              .content {
                background-color: #ffffff;
                padding: 30px;
                border: 1px solid #dee2e6;
              }
              .greeting {
                font-size: 18px;
                margin-bottom: 20px;
              }
              .message {
                background-color: #f8f9fa;
                padding: 20px;
                margin: 20px 0;
                border-left: 4px solid #007bff;
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
                <h1>US INNOWAVE</h1>
                <p style="margin: 10px 0 0 0;">상담 신청 확인</p>
              </div>

              <div class="content">
                <div class="greeting">
                  안녕하세요, ${data.name}님
                </div>

                <p>
                  US INNOWAVE에 상담을 신청해 주셔서 감사합니다.<br>
                  고객님의 상담 신청이 정상적으로 접수되었습니다.
                </p>

                <div class="message">
                  <strong>신청하신 정보:</strong><br><br>
                  • 회사명: ${data.company}<br>
                  • 서비스: ${data.service}<br>
                  • 연락처: ${data.phone}<br>
                  • 이메일: ${data.email}
                </div>

                <p>
                  담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.<br>
                  추가 문의사항이 있으시면 언제든지 연락 주시기 바랍니다.
                </p>

                <p style="margin-top: 30px;">
                  감사합니다.<br>
                  <strong>US INNOWAVE 팀</strong>
                </p>
              </div>

              <div class="footer">
                <p>이 메일은 상담 신청 확인을 위해 자동으로 발송되었습니다.</p>
                <p>© 2024 US INNOWAVE. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        안녕하세요, ${data.name}님

        US INNOWAVE에 상담을 신청해 주셔서 감사합니다.
        고객님의 상담 신청이 정상적으로 접수되었습니다.

        신청하신 정보:
        • 회사명: ${data.company}
        • 서비스: ${data.service}
        • 연락처: ${data.phone}
        • 이메일: ${data.email}

        담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.
        추가 문의사항이 있으시면 언제든지 연락 주시기 바랍니다.

        감사합니다.
        US INNOWAVE 팀
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Client confirmation email error:', error);
    return false;
  }
}