"use client"

import { format } from "date-fns"
import { ko } from "date-fns/locale"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Consultation {
  id: number
  // 기업 정보
  company_name: string
  company_type: string
  business_number?: string
  business_address?: string
  // 신청자 정보
  applicant_name: string
  phone_number: string
  email: string
  // 상담 정보
  region: string
  annual_sales?: string
  loan_amount?: string
  consultation_date?: string
  consultation_fields?: string[]
  consultation_content?: string
  // 시스템 필드
  privacy_agree?: boolean
  confirmed: boolean
  created_at: string
}

interface ConsultationDetailModalProps {
  consultation: Consultation | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange: (id: number, confirmed: boolean) => Promise<void>
}

export function ConsultationDetailModal({
  consultation,
  open,
  onOpenChange,
  onStatusChange,
}: ConsultationDetailModalProps) {
  if (!consultation) return null

  const handleStatusChange = async () => {
    await onStatusChange(consultation.id, !consultation.confirmed)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">상담 신청 상세 정보</DialogTitle>
            <Badge variant={consultation.confirmed ? "default" : "secondary"}>
              {consultation.confirmed ? "확인됨" : "미확인"}
            </Badge>
          </div>
          <DialogDescription>
            접수일시: {format(new Date(consultation.created_at), "yyyy년 MM월 dd일 HH:mm", { locale: ko })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* 기업 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">기업 정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">기업명</label>
                <p className="mt-1 text-sm">{consultation.company_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">기업형태</label>
                <p className="mt-1 text-sm">{consultation.company_type}</p>
              </div>
              {consultation.business_number && (
                <div>
                  <label className="text-sm font-medium text-gray-500">사업자번호</label>
                  <p className="mt-1 text-sm">{consultation.business_number}</p>
                </div>
              )}
              {consultation.business_address && (
                <div>
                  <label className="text-sm font-medium text-gray-500">사업장 주소</label>
                  <p className="mt-1 text-sm">{consultation.business_address}</p>
                </div>
              )}
            </div>
          </div>

          {/* 신청자 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">신청자 정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">신청자 성명</label>
                <p className="mt-1 text-sm">{consultation.applicant_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">휴대폰</label>
                <p className="mt-1 text-sm">{consultation.phone_number}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">이메일</label>
                <p className="mt-1 text-sm">
                  <a href={`mailto:${consultation.email}`} className="text-blue-600 hover:underline">
                    {consultation.email}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* 상담 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">상담 정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">지역</label>
                <p className="mt-1 text-sm">{consultation.region}</p>
              </div>
              {consultation.annual_sales && (
                <div>
                  <label className="text-sm font-medium text-gray-500">연간 매출액</label>
                  <p className="mt-1 text-sm">{consultation.annual_sales}</p>
                </div>
              )}
              {consultation.loan_amount && (
                <div>
                  <label className="text-sm font-medium text-gray-500">대출 요청 금액</label>
                  <p className="mt-1 text-sm">{consultation.loan_amount}</p>
                </div>
              )}
              {consultation.consultation_date && (
                <div>
                  <label className="text-sm font-medium text-gray-500">상담 희망 일시</label>
                  <p className="mt-1 text-sm">{consultation.consultation_date}</p>
                </div>
              )}
            </div>

            {consultation.consultation_fields && consultation.consultation_fields.length > 0 && (
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-500">상담 요청 분야</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {consultation.consultation_fields.map((field, index) => (
                    <Badge key={index} variant="outline">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {consultation.consultation_content && (
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-500">상담 내용</label>
                <p className="mt-1 text-sm whitespace-pre-wrap bg-gray-50 p-3 rounded">
                  {consultation.consultation_content}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant={consultation.confirmed ? "secondary" : "default"}
              onClick={handleStatusChange}
            >
              {consultation.confirmed ? "미확인으로 변경" : "확인 처리"}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              닫기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}