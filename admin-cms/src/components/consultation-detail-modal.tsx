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
  name: string
  company: string
  position: string
  phone: string
  email: string
  service: string
  message: string
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
      <DialogContent className="max-w-2xl">
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

        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">이름</label>
              <p className="mt-1 text-sm">{consultation.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">회사명</label>
              <p className="mt-1 text-sm">{consultation.company}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">직책</label>
              <p className="mt-1 text-sm">{consultation.position}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">연락처</label>
              <p className="mt-1 text-sm">{consultation.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">이메일</label>
              <p className="mt-1 text-sm">
                <a href={`mailto:${consultation.email}`} className="text-blue-600 hover:underline">
                  {consultation.email}
                </a>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">서비스</label>
              <p className="mt-1 text-sm">{consultation.service}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">상담 내용</label>
            <div className="mt-1 p-3 bg-gray-50 border border-gray-200">
              <p className="text-sm whitespace-pre-wrap">{consultation.message}</p>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              닫기
            </Button>
            <Button
              variant={consultation.confirmed ? "secondary" : "default"}
              onClick={handleStatusChange}
            >
              {consultation.confirmed ? "미확인으로 변경" : "확인 처리"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}