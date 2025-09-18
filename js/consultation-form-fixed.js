// consultation-form.js 수정 부분
// submitConsultationForm 함수 내 데이터 매핑 부분

// 기존 데이터 구조를 CMS가 기대하는 구조로 변환
const cmsData = {
    name: data.applicantName,              // 신청자 성명 → 이름
    company: data.companyName,             // 기업명 → 회사명
    position: '담당자',                     // 직책 (기본값)
    phone: data.phoneNumber,                // 휴대폰 → 연락처
    email: data.email,                     // 이메일
    service: data.region || '선택',         // 지역 → 서비스
    message: `
기업형태: ${data.companyType}
사업자번호: ${data.businessNumber}
사업장주소: ${data.businessAddress}
연간매출액: ${data.annualSales}
대출요청금액: ${data.loanAmount}
상담희망일시: ${data.consultationDate}
상담분야: ${data.consultationFields.join(', ')}
상담내용: ${data.consultationContent}
    `.trim(),                              // 모든 추가 정보를 message 필드에 통합
    confirmed: false
};

// API로 전송
const response = await fetch('https://us-cms.vercel.app/api/consultations', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(cmsData)  // cmsData로 변경
});