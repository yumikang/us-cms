// 상담 신청 폼 처리 스크립트
document.addEventListener('DOMContentLoaded', function() {
    const consultationForm = document.getElementById('consultationApplicationForm');

    if (consultationForm) {
        // 폼 제출 이벤트 처리
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 폼 데이터 수집
            const formData = new FormData(consultationForm);
            const data = {
                // 기업 정보
                companyName: formData.get('companyName'),
                companyType: formData.get('companyType'),
                businessNumber: formData.get('businessNumber'),
                businessAddress: formData.get('businessAddress'),

                // 신청자 정보
                applicantName: formData.get('applicantName'),
                phoneNumber: formData.get('phoneNumber'),
                email: formData.get('email'),

                // 상담 정보
                region: formData.get('region'),
                annualSales: formData.get('annualSales'),
                loanAmount: formData.get('loanAmount'),
                consultationDate: formData.get('consultationDate'),
                consultationContent: formData.get('consultationContent'),

                // 상담 분야 (체크박스 - 복수선택)
                consultationFields: [],

                // 개인정보 동의
                privacyAgree: formData.get('privacyAgree') === 'on',

                // 제출 시간
                submittedAt: new Date().toISOString()
            };

            // 상담 분야 체크박스 값 수집
            const checkboxes = consultationForm.querySelectorAll('input[name="consultationField"]:checked');
            checkboxes.forEach(checkbox => {
                data.consultationFields.push(checkbox.value);
            });

            // 유효성 검사
            if (!validateForm(data)) {
                return;
            }

            // 제출 처리
            submitConsultationForm(data);
        });

        // 전화번호 입력 포맷팅
        const phoneInput = document.getElementById('phoneNumber');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length > 3 && value.length <= 7) {
                    value = value.slice(0, 3) + '-' + value.slice(3);
                } else if (value.length > 7) {
                    value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
                }
                e.target.value = value;
            });
        }

        // 사업자번호 입력 포맷팅
        const businessNumberInput = document.getElementById('businessNumber');
        if (businessNumberInput) {
            businessNumberInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length > 3 && value.length <= 5) {
                    value = value.slice(0, 3) + '-' + value.slice(3);
                } else if (value.length > 5) {
                    value = value.slice(0, 3) + '-' + value.slice(3, 5) + '-' + value.slice(5, 10);
                }
                e.target.value = value;
            });
        }
    }
});

// 폼 유효성 검사
function validateForm(data) {
    // 필수 필드 확인
    if (!data.companyName) {
        showAlert('기업명을 입력해주세요.');
        return false;
    }

    if (!data.companyType) {
        showAlert('기업형태를 선택해주세요.');
        return false;
    }

    if (!data.applicantName) {
        showAlert('신청자 성명을 입력해주세요.');
        return false;
    }

    if (!data.phoneNumber) {
        showAlert('휴대폰 번호를 입력해주세요.');
        return false;
    }

    // 이메일 형식 확인
    if (!data.email) {
        showAlert('이메일을 입력해주세요.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showAlert('올바른 이메일 형식을 입력해주세요.');
        return false;
    }

    if (!data.region) {
        showAlert('지역을 선택해주세요.');
        return false;
    }

    if (data.consultationFields.length === 0) {
        showAlert('상담 요청 분야를 하나 이상 선택해주세요.');
        return false;
    }

    if (!data.privacyAgree) {
        showAlert('개인정보 수집 및 이용에 동의해주세요.');
        return false;
    }

    return true;
}

// 폼 제출 처리
async function submitConsultationForm(data) {
    // 버튼 비활성화 (중복 제출 방지)
    const submitButton = document.querySelector('.consultation-form button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i data-feather="loader"></i> 제출 중...';
    }

    try {
        // API로 전송 (Next.js CMS)
        const response = await fetch('https://us-cms.vercel.app/api/consultations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.applicantName,
                company: data.companyName,
                position: data.position,
                phone: data.phoneNumber,
                email: data.email,
                service: data.serviceType,
                message: data.consultationContent
            })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // 성공 메시지 표시
            showSuccessModal(data);

            // 폼 초기화
            document.getElementById('consultationApplicationForm').reset();
        } else {
            // 에러 메시지 표시
            showAlert(result.error || '상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    } catch (error) {
        console.error('Consultation submission error:', error);
        // 네트워크 오류 등의 경우
        showAlert('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        // 버튼 원상복구
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = '상담 신청하기 <i data-feather="send"></i>';

            // Feather 아이콘 다시 렌더링
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }
    }
}

// 알림 메시지 표시
function showAlert(message) {
    // 기존 알림이 있다면 제거
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = 'form-alert form-alert-error';
    alert.innerHTML = `
        <div class="alert-content">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <span>${message}</span>
        </div>
    `;

    const form = document.getElementById('consultationApplicationForm');
    form.insertBefore(alert, form.firstChild);

    // 스크롤 이동
    alert.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 5초 후 자동 제거
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// 성공 모달 표시
function showSuccessModal(data) {
    // 모달 HTML 생성
    const modal = document.createElement('div');
    modal.className = 'consultation-success-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="30" fill="#4CAF50" opacity="0.1"/>
                    <path d="M30 40c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z" fill="#4CAF50"/>
                    <path d="M27 30l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3>상담 신청이 완료되었습니다!</h3>
            </div>
            <div class="modal-body">
                <p>고객님의 상담 신청이 정상적으로 접수되었습니다.</p>
                <div class="submission-info">
                    <div class="info-item">
                        <strong>신청자:</strong> ${data.applicantName}
                    </div>
                    <div class="info-item">
                        <strong>기업명:</strong> ${data.companyName}
                    </div>
                    <div class="info-item">
                        <strong>연락처:</strong> ${data.phoneNumber}
                    </div>
                    <div class="info-item">
                        <strong>이메일:</strong> ${data.email}
                    </div>
                </div>
                <p class="notice">담당자가 영업일 기준 1-2일 이내에 연락드리겠습니다.</p>
            </div>
            <div class="modal-footer">
                <button class="btn-close-modal">확인</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 모달 스타일 추가
    addModalStyles();

    // 확인 버튼 클릭 시 모달 닫기
    modal.querySelector('.btn-close-modal').addEventListener('click', function() {
        modal.remove();
    });

    // 배경 클릭 시 모달 닫기
    modal.querySelector('.modal-backdrop').addEventListener('click', function() {
        modal.remove();
    });
}

// 모달 스타일 추가
function addModalStyles() {
    if (document.getElementById('consultation-modal-styles')) {
        return;
    }

    const style = document.createElement('style');
    style.id = 'consultation-modal-styles';
    style.innerHTML = `
        .form-alert {
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            animation: slideDown 0.3s ease;
        }

        .form-alert-error {
            background: #ffebee;
            border: 1px solid #ffcdd2;
            color: #c62828;
        }

        .alert-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .consultation-success-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }

        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
            position: relative;
            background: white;
            border-radius: 16px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        }

        .modal-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .modal-header h3 {
            margin-top: 20px;
            font-size: 1.5rem;
            color: #333;
        }

        .modal-body {
            margin-bottom: 30px;
        }

        .modal-body p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .submission-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .info-item {
            padding: 8px 0;
            color: #555;
        }

        .notice {
            background: #e3f2fd;
            color: #1565c0;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
        }

        .modal-footer {
            text-align: center;
        }

        .btn-close-modal {
            background: var(--primary, #003d82);
            color: white;
            border: none;
            padding: 12px 40px;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }

        .btn-close-modal:hover {
            background: #002d62;
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 61, 130, 0.3);
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 768px) {
            .modal-content {
                padding: 30px 20px;
                width: 95%;
            }

            .modal-header h3 {
                font-size: 1.25rem;
            }
        }
    `;

    document.head.appendChild(style);
}