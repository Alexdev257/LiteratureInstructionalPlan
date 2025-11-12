"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Shield, ArrowLeft } from "lucide-react"
import { otpSchema, type OtpInput } from "@/schema/authSchema"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

interface VerifyCodeProps {
  email: string
  onGoBack: () => void
  onSubmit: (data: OtpInput) => void
  onResendCode: () => void
  isLoading?: boolean
  isResending?: boolean
}

export default function VerifyCode({
  email = "user@example.com",
  onGoBack,
  onSubmit,
  onResendCode,
  isLoading = false,
  isResending = false
}: VerifyCodeProps) {
  const [countdown, setCountdown] = useState(60)

  const form = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email,
      otp: "",
    },
  })

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSubmit = (data: OtpInput) => {
    onSubmit(data)
  }

  const handleResend = () => {
    onResendCode()
    setCountdown(60)
    form.setValue("otp", "")
  }

  return (
    <Card className="w-full shadow-lg border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onGoBack}
            disabled={isLoading}
            className="p-0 h-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Quay lại
          </Button>
        </div>
        
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <CardTitle className="text-2xl font-bold text-center">
          Xác thực email
        </CardTitle>
        <CardDescription className="text-center">
          Chúng tôi đã gửi mã xác thực 6 chữ số đến
          <br />
          <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-center block">Nhập mã xác thực</FormLabel>
                  <FormControl>
                    <div className="flex justify-center">
                      <InputOTP 
                        maxLength={6} 
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isLoading}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <div className="mx-2 text-gray-300 text-xl">•</div>
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || form.watch("otp").length !== 6}
            >
              {isLoading ? "Đang xác thực..." : "Xác thực"}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Không nhận được mã?
              </p>
              
              {countdown > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Gửi lại mã sau {countdown}s
                </p>
              ) : (
                <Button
                  type="button"
                  variant="link"
                  onClick={handleResend}
                  disabled={isResending}
                  className="p-0 h-auto text-primary hover:text-primary/80"
                >
                  {isResending ? "Đang gửi..." : "Gửi lại mã"}
                </Button>
              )}
            </div>

            <div className="flex items-center justify-center text-xs text-muted-foreground">
              <Mail className="h-3 w-3 mr-1" />
              Kiểm tra cả thư mục spam nếu không thấy email
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}