
"use client"

import { useState } from "react"
import { useRouter } from "@tanstack/react-router"
import { toast } from "sonner"
import { type ResetPasswordInput, type OtpInput } from "@/schema/authSchema"

// Import components
import ResetPasswordForm from "./resetPassword"
import VerifyCode from "./verifyCode"
import { useAuth } from "@/hooks/useAuth"


type Step = "reset-password" | "verify-otp"

export default function ForgotPasswordClientWrapper() {
  const [currentStep, setCurrentStep] = useState<Step>("reset-password")
  const [email, setEmail] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [isResending, setIsResending] = useState<boolean>(false)
  const { verifyResetPasswordCode, resetPassword } = useAuth()

  const router = useRouter()

  // Handle step 1: Reset password form submission
  const handleResetPasswordSubmit = async (data: ResetPasswordInput) => {
    console.log(data);
    resetPassword.mutate(data, {
      onSuccess: (response) => {
        console.log(response);
        toast.success(response.message || "Reset password email sent. Please check your inbox.")
        setEmail(data.email)
        setNewPassword(data.newPassword)
        setCurrentStep("verify-otp")
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.message || "Failed to send reset password email. Please try again.")
      }

    })
  }

  // Handle step 2: OTP verification
  const handleOtpSubmit = async (data: OtpInput) => {
    verifyResetPasswordCode.mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message || "OTP verified successfully. You can now log in with your new password.")
        router.navigate({ to: "/auth/login" })
      },
      onError: (error) => {
        toast.error(error.message || "Failed to verify OTP. Please try again.")
      }
    })
  }


  // Handle resend OTP
  const handleResendOtp = async () => {
    setIsResending(true)
    try {
      await resetPassword.mutateAsync(
        { email: email, newPassword: newPassword, confirmPassword: newPassword }
      )
      toast.success("OTP resent successfully.")
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message
          : undefined;
      toast.error(errorMessage || "Failed to resend OTP. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  // Handle go back to step 1
  const handleGoBack = () => {
    setCurrentStep("reset-password")
  }

  // Handle navigate to login
  const handleNavigateToLogin = () => {
    router.navigate({ to: "/auth/login" })
  }

  return (
    <>
      {currentStep === "reset-password" && (
        <ResetPasswordForm
          onSubmit={handleResetPasswordSubmit}
          onNavigateToLogin={handleNavigateToLogin}
          isLoading={resetPassword.isPending}
        />
      )}

      {currentStep === "verify-otp" && (
        <VerifyCode
          email={email}
          onGoBack={handleGoBack}
          onSubmit={handleOtpSubmit}
          onResendCode={handleResendOtp}
          isLoading={verifyResetPasswordCode.isPending}
          isResending={isResending}
        />
      )}
    </>
  )
}




