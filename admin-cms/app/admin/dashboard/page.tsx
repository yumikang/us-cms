"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ConsultationDetailModal } from "@/components/consultation-detail-modal"

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

export default function AdminDashboardPage() {
  const router = useRouter()
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "confirmed" | "unconfirmed">("all")

  useEffect(() => {
    // Check if logged in
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }

    fetchConsultations()
  }, [router])

  const fetchConsultations = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const queryParams = filter !== "all" ? `?confirmed=${filter === "confirmed"}` : ""

      const response = await fetch(`/api/consultations${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 401) {
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminUsername")
        router.push("/admin/login")
        return
      }

      const data = await response.json()
      if (data.success) {
        setConsultations(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch consultations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: number, confirmed: boolean) => {
    try {
      const token = localStorage.getItem("adminToken")

      const response = await fetch(`/api/consultations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ confirmed }),
      })

      if (response.ok) {
        // Refresh the list
        await fetchConsultations()
        // Update selected consultation if it's the same
        if (selectedConsultation?.id === id) {
          setSelectedConsultation({
            ...selectedConsultation,
            confirmed,
          })
        }
      }
    } catch (error) {
      console.error("Failed to update consultation status:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUsername")
    router.push("/admin/login")
  }

  const openDetail = (consultation: Consultation) => {
    setSelectedConsultation(consultation)
    setModalOpen(true)
  }

  const filteredConsultations = consultations.filter(consultation => {
    if (filter === "all") return true
    if (filter === "confirmed") return consultation.confirmed
    if (filter === "unconfirmed") return !consultation.confirmed
    return true
  })

  const stats = {
    total: consultations.length,
    confirmed: consultations.filter(c => c.confirmed).length,
    unconfirmed: consultations.filter(c => !c.confirmed).length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8" style={{ maxWidth: "1450px" }}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">상담 신청 관리</h1>
          <Button variant="outline" onClick={handleLogout}>
            로그아웃
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">전체 상담</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.total}건</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">확인됨</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{stats.confirmed}건</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">미확인</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-600">{stats.unconfirmed}건</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => {
              setFilter("all")
              fetchConsultations()
            }}
          >
            전체
          </Button>
          <Button
            variant={filter === "unconfirmed" ? "default" : "outline"}
            onClick={() => {
              setFilter("unconfirmed")
              fetchConsultations()
            }}
          >
            미확인
          </Button>
          <Button
            variant={filter === "confirmed" ? "default" : "outline"}
            onClick={() => {
              setFilter("confirmed")
              fetchConsultations()
            }}
          >
            확인됨
          </Button>
        </div>

        {/* Consultations Table */}
        <Card>
          <CardHeader>
            <CardTitle>상담 신청 목록</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">로딩 중...</div>
            ) : filteredConsultations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                상담 신청이 없습니다.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>신청일시</TableHead>
                    <TableHead>신청자</TableHead>
                    <TableHead>기업명</TableHead>
                    <TableHead>기업형태</TableHead>
                    <TableHead>지역</TableHead>
                    <TableHead>연락처</TableHead>
                    <TableHead className="w-[100px]">상태</TableHead>
                    <TableHead className="w-[150px]">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsultations.map((consultation) => (
                    <TableRow key={consultation.id}>
                      <TableCell className="font-medium">{consultation.id}</TableCell>
                      <TableCell>
                        {format(new Date(consultation.created_at), "MM/dd HH:mm", { locale: ko })}
                      </TableCell>
                      <TableCell>{consultation.applicant_name}</TableCell>
                      <TableCell>{consultation.company_name}</TableCell>
                      <TableCell>{consultation.company_type}</TableCell>
                      <TableCell>{consultation.region}</TableCell>
                      <TableCell>{consultation.phone_number}</TableCell>
                      <TableCell>
                        <Badge variant={consultation.confirmed ? "default" : "secondary"}>
                          {consultation.confirmed ? "확인됨" : "미확인"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openDetail(consultation)}
                          >
                            상세
                          </Button>
                          <Button
                            size="sm"
                            variant={consultation.confirmed ? "secondary" : "default"}
                            onClick={() => handleStatusChange(consultation.id, !consultation.confirmed)}
                          >
                            {consultation.confirmed ? "미확인" : "확인"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Detail Modal */}
        <ConsultationDetailModal
          consultation={selectedConsultation}
          open={modalOpen}
          onOpenChange={setModalOpen}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  )
}