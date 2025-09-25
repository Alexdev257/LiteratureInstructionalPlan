"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@tanstack/react-router"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { loginSchema, type LoginInput } from "@/schema/authSchema"

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
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { setCookies } from "@/utils/setCookies"
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { login, loginGoogle } = useAuth()

  const handleSubmit = (data: LoginInput) => {
    login.mutate(data, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Đăng nhập thành công!");
          router.navigate({ to: "/" });
          setCookies(res);
        } else {
          toast.error(res.message || "Đăng nhập thất bại. Vui lòng thử lại!");
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  }
  const handleLoginGoogle = (credentialResponse: CredentialResponse) => {
    loginGoogle.mutate(credentialResponse, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Đăng nhập thành công!");
          router.navigate({ to: "/" });
          setCookies(res);
        } else {
          toast.error(res.message || "Đăng nhập thất bại. Vui lòng thử lại!");
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  }
  return (
    <Card className="w-full max-w-md mx-auto mt-16 shadow-xl rounded-2xl border-0 bg-white/90 backdrop-blur-md">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-extrabold">Đăng nhập</CardTitle>
        <CardDescription>
          Nhập email và mật khẩu để đăng nhập vào tài khoản của bạn
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="pl-12"
                        disabled={login.isPending}
                        autoComplete="email"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu của bạn"
                        className="pl-12 pr-12"
                        disabled={login.isPending}
                        autoComplete="current-password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={login.isPending}

                      >
                        {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Forgot password */}
            <div className="flex justify-end">
              <Button
                type="button"
                variant="link"
                className="px-0 text-sm font-medium"
                disabled={login.isPending}
                onClick={() => router.navigate({ to: "/auth/forgot-password" })}
              >
                Quên mật khẩu?
              </Button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full py-3 text-lg font-semibold"
              disabled={login.isPending}
            >
              {login.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <span className="flex-1 h-px bg-gray-300" />
              <span className="mx-3 text-gray-400 text-sm">hoặc</span>
              <span className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Google Login */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => handleLoginGoogle(credentialResponse)}
                onError={() => toast.error("Login Google thất bại")}
              />
            </div>

            {/* Register link */}
            <div className="text-center mt-4 text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Button
                type="button"
                variant="link"
                className="px-0 font-medium"
                disabled={login.isPending}
                onClick={() => router.navigate({ to: "/auth/register" })}
              >
                Đăng ký ngay
              </Button>
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  )

}
