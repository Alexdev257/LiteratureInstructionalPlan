import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSessionStore } from '@/stores/sessionStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
// import { getProfile, updateProfile } from './userProfile.service'

const profileSchema = z.object({
  userName: z.string().min(3, 'Tên đăng nhập tối thiểu 3 ký tự'),
  fullName: z.string().min(2, 'Họ tên tối thiểu 2 ký tự'),
  email: z.string().email('Email không hợp lệ').min(1, 'Email là bắt buộc'),
})
type ProfileForm = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const router = useRouter()
  const { user, updateUser } = useSessionStore()

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userName: (user as any)?.userName ?? (user as any)?.UserName ?? '',
      fullName: (user as any)?.fullName ?? (user as any)?.FullName ?? '',
      email: (user as any)?.email ?? (user as any)?.Email ?? '',
    },
  })

  useEffect(() => {
    if (user) {
      form.reset({
        userName: (user as any)?.userName ?? (user as any)?.UserName ?? '',
        fullName: (user as any)?.fullName ?? (user as any)?.FullName ?? '',
        email: (user as any)?.email ?? (user as any)?.Email ?? '',
      })
    }
  }, [user, form.reset])

  const onSubmit = async (values: ProfileForm) => {
    try {
      updateUser({
        userName: values.userName as any,
        fullName: values.fullName as any,
        email: values.email as any,
        UserName: values.userName as any,
        FullName: values.fullName as any,
        Email: values.email as any,
      } as any)

      toast?.success?.('Cập nhật hồ sơ thành công')
    } catch (e) {
      console.error(e)
      toast?.error?.('Cập nhật thất bại, thử lại sau')
    }
  }

  if (!user) {
    router.navigate({ to: '/auth/login' })
    return null
  }

  return (
     <div className="max-w-7xl mx-auto px-4 py-8">
  <Card className="bg-blue-50 border border-blue-200 shadow-sm scale-110">
    <CardHeader className="border-b border-blue-200 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        <div className="flex justify-center md:justify-start">
          <img
            src="/avatar-placeholder.png"
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-blue-300 shadow-sm bg-white"
          />
        </div>

        <div className="md:col-span-2 text-center md:text-left">
          <CardTitle className="text-3xl font-bold text-blue-900">
            Hồ sơ cá nhân
          </CardTitle>
          <CardDescription className="text-blue-600 mt-2">
            Cập nhật thông tin tài khoản của bạn
          </CardDescription>
        </div>
      </div>
    </CardHeader>

    <CardContent className="pt-8">
      <div className="w-full md:w-1/2 lg:w-2/3 space-y-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="userName">Tên đăng nhập</Label>
            <Input
              id="userName"
              {...form.register('userName')}
              placeholder="username"
              className="mt-2"
            />
            {form.formState.errors.userName && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.userName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="fullName">Họ và tên</Label>
            <Input
              id="fullName"
              {...form.register('fullName')}
              placeholder="Nguyễn Văn A"
              className="mt-2"
            />
            {form.formState.errors.fullName && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...form.register('email')}
              placeholder="email@example.com"
              className="mt-2"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </CardContent>

    <CardFooter className="flex flex-col md:flex-row justify-end gap-3 pt-6 border-t border-blue-200">
      <Button
        onClick={form.handleSubmit(onSubmit)}
        className="bg-blue-700 hover:bg-blue-800 text-white md:w-auto w-full"
      >
        Lưu thay đổi
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={() => form.reset()}
        className="md:w-auto w-full"
      >
        Hoàn tác
      </Button>
    </CardFooter>
  </Card>
</div>

  )
}