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

  const { login } = useAuth()

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

  return (
    <Card className="w-full shadow-lg border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Đăng nhập
        </CardTitle>
        <CardDescription className="text-center">
          Nhập email và mật khẩu để đăng nhập vào tài khoản của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="pl-10"
                        disabled={login.isPending}
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
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu của bạn"
                        className="pl-10 pr-10"
                        disabled={login.isPending}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={login.isPending}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end">
              <Button
                type="button"
                variant="link"
                className="px-0 font-normal h-auto"
                disabled={login.isPending}
                onClick={() => router.navigate({ to: "/auth/forgot-password" })}
              >
                Quên mật khẩu?
              </Button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={login.isPending}
            >
              {login.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Chưa có tài khoản? </span>
              <Button
                type="button"
                variant="link"
                className="px-0 font-normal h-auto"
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
