"use client"

import { useState } from "react"
import { useRouter } from "@tanstack/react-router"
import { RegisterForm } from "./formRegister"

import { type RegisterInput, type OtpInput } from "@/schema/authSchema"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import VerifyCode from "./verifyCode"

export function RegisterClientWrapper() {
  const [step, setStep] = useState<"register" | "verify">("register")
  const [email, setEmail] = useState<string>("")
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()

  const { register, verifyCode } = useAuth()

  // Đăng ký
  const handleRegister = (data: RegisterInput) => {
    register.mutate(data, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Đăng ký thành công!")
          setEmail(data.email)
          setStep("verify")
        } 
      },
      onError: (error) => {
        toast.error(error.message || "Đăng ký thất bại. Vui lòng thử lại!")
      },
    })
  }

  // Xác thực OTP
  const handleVerifyCode = (data: OtpInput) => {
    verifyCode.mutate(data, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Xác thực thành công! Bạn có thể đăng nhập ngay bây giờ.")
          setStep("register")
          setEmail("")
          router.navigate({ to: "/auth/login" })
        } 
      },
      onError: (error) => {
        toast.error(error.message || "Xác thực thất bại. Vui lòng thử lại!");
      },
    })
  }

  // Gửi lại OTP
  const handleResendCode = async () => {
    try {
      setIsResending(true)
      // Fake call API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Mã xác thực mới đã được gửi!")
    } catch (error) {
      console.error("Resend OTP error:", error)
      toast.error("Không thể gửi lại mã. Vui lòng thử lại!")
    } finally {
      setIsResending(false)
    }
  }

  const handleGoBack = () => setStep("register")
  const handleNavigateToLogin = () => router.navigate({ to: "/auth/login" })

  return (
    <>
      {step === "register" ? (
        <RegisterForm
          onSubmit={handleRegister}
          isLoading={register.isPending}
          onNavigateToLogin={handleNavigateToLogin}
        />
      ) : (
        <VerifyCode
          email={email}
          onSubmit={handleVerifyCode}
          onResendCode={handleResendCode}
          onGoBack={handleGoBack}
          isLoading={verifyCode.isPending}
          isResending={isResending}
        />
      )}
    </>
  )
}
