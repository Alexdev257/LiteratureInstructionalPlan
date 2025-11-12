"use client";

import { useParams } from "@tanstack/react-router";
import {
  Mail,
  User,
  Calendar,
  Shield,
  Trash2,
  // --- THÊM MỚI ---
  Pencil,
  Loader2,
} from "lucide-react";
import { BaseHeader } from "@/components/layout/base/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/useUser";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// --- THÊM MỚI: Import cho Form, Dialog, v.v... ---
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; // Giả sử bạn dùng sonner
import { useAuth } from "@/hooks/useAuth"; // Hook mới

// --- SỬA LỖI: Tách import value và import type ---
import {
  updateProfileSchema,
  changePasswordSchema,
} from "@/schema/authSchema"; // Schema mới (values)
import type {
  UpdateProfileInput,
  ChangePasswordInput,
} from "@/schema/authSchema"; // Schema mới (types)
// --- KẾT THÚC SỬA LỖI ---

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// --- KẾT THÚC THÊM MỚI ---

// --- THÊM MỚI: Component Form Cập nhật thông tin ---
function UpdateProfileForm({
  user,
  setOpen,
}: {
  user: any;
  setOpen: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  // Lấy mutation từ hook
  const { mutate: updateProfile, isPending } = useAuth().updateProfile;

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      userName: user.userName || "",
      fullName: user.fullName || "",
    },
  });

  const onSubmit = (data: UpdateProfileInput) => {
    // Backend yêu cầu id
    updateProfile(
      { id: user.userId, data }, // Giả định user object có userId
      {
        onSuccess: (res) => {
          if (res.isSuccess) {
            toast.success("Cập nhật thông tin thành công!");
            // Tải lại dữ liệu trang profile (queryKey "user" từ useUser)
            queryClient.invalidateQueries({ queryKey: ["user", user.userId] });
            setOpen(false); // Đóng dialog
          } else {
            toast.error(res.message || "Cập nhật thất bại.");
          }
        },
        onError: (err) => {
          toast.error("Đã có lỗi xảy ra: " + err.message);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên đăng nhập</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên đăng nhập" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Nhập họ và tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
// --- KẾT THÚC THÊM MỚI ---

// --- THÊM MỚI: Component Form Đổi mật khẩu ---
function ChangePasswordForm({
  userEmail,
  setOpen,
}: {
  userEmail: string;
  setOpen: (open: boolean) => void;
}) {
  // Lấy mutation từ hook
  const { mutate: changePassword, isPending } = useAuth().changePassword;

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      email: userEmail || "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (data: ChangePasswordInput) => {
    // Bỏ confirmNewPassword trước khi gửi
    const { confirmNewPassword, ...payload } = data;

    changePassword(payload, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success("Đổi mật khẩu thành công!");
          form.reset(); // Xóa các trường
          setOpen(false); // Đóng dialog
        } else {
          // Hiển thị lỗi từ backend (ví dụ: "Old password is incorrect!")
          toast.error(res.message || "Đổi mật khẩu thất bại.");
        }
      },
      onError: (err) => {
        toast.error("Đã có lỗi xảy ra: " + err.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} readOnly disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu cũ</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu cũ"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Đổi mật khẩu
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
// --- KẾT THÚC THÊM MỚI ---

export default function ProfilePage() {
  const { id } = useParams({ from: "/userProfile/$id" });
  const { useGetUserById } = useUser();
  const { data: userProfile, isLoading, isError } = useGetUserById(Number(id));
  // --- THÊM MỚI ---
  const [isDialogOpen, setDialogOpen] = useState(false); // State cho Dialog
  // --- KẾT THÚC THÊM MỚI ---

  const user = userProfile?.data;

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get role name
  const getRoleName = (roleId: number) => {
    const roles: Record<number, string> = {
      1: "Học sinh",
      2: "Giáo viên",
      3: "Quản trị viên",
    };
    return roles[roleId] || "Người dùng";
  };

  // Get role color
  const getRoleColor = (roleId: number) => {
    const colors: Record<number, "destructive" | "default" | "secondary"> = {
      1: "secondary",
      2: "default",
      3: "destructive",
    };
    return colors[roleId] || "secondary";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 p-3">
        <BaseHeader
          title="Hồ Sơ Người Dùng"
          description="Đang tải thông tin..."
        />
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (isError || !user) {
    return (
      <div className="space-y-6 p-3">
        <BaseHeader
          title="Hồ Sơ Người Dùng"
          description="Không tìm thấy thông tin"
        />
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              Không thể tải thông tin người dùng. Vui lòng thử lại sau.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-3">
      {/* --- THAY ĐỔI: Thêm flex wrapper và Dialog --- */}
      <div className="flex justify-between items-center">
        <BaseHeader
          title="Hồ Sơ Người Dùng"
          description="Thông tin chi tiết về tài khoản"
        />
        {/* NÚT MỞ DIALOG CHỈNH SỬA */}
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Chỉnh sửa hồ sơ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin cá nhân hoặc thay đổi mật khẩu của bạn.
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
                <TabsTrigger value="password">Đổi mật khẩu</TabsTrigger>
              </TabsList>

              {/* Tab 1: Cập nhật thông tin */}
              <TabsContent value="profile" className="pt-4">
                <UpdateProfileForm user={user} setOpen={setDialogOpen} />
              </TabsContent>

              {/* Tab 2: Đổi mật khẩu */}
              <TabsContent value="password" className="pt-4">
                <ChangePasswordForm
                  userEmail={user.email}
                  setOpen={setDialogOpen}
                />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
      {/* --- KẾT THÚC THAY ĐỔI --- */}

      {/* Profile Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`}
              />
              <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h2 className="text-3xl font-bold">{user.fullName}</h2>
                <Badge variant={getRoleColor(user.roleId)}>
                  {getRoleName(user.roleId)}
                </Badge>
                {user.isDeleted && (
                  <Badge variant="destructive" className="gap-1">
                    <Trash2 className="h-3 w-3" />
                    Đã xóa
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">@{user.userName}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Tham gia ngày{" "}
                  {format(new Date(user.createdAt), "dd/MM/yyyy", {
                    locale: vi,
                  })}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Thông tin tài khoản
            </CardTitle>
            <CardDescription>Chi tiết về tài khoản người dùng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Tên đăng nhập
              </label>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 p-3 bg-muted rounded-md">
                  {user.userName}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Họ và tên
              </label>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 p-3 bg-muted rounded-md">
                  {user.fullName}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 p-3 bg-muted rounded-md">
                  {user.email}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Thông tin hệ thống
            </CardTitle>
            <CardDescription>Thông tin về quyền và trạng thái</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Vai trò
              </label>
              <div className="p-3 bg-muted rounded-md">
                <Badge
                  variant={getRoleColor(user.roleId)}
                  className="w-full justify-center"
                >
                  {getRoleName(user.roleId)}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Ngày tạo
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 p-3 bg-muted rounded-md">
                  {format(new Date(user.createdAt), "dd/MM/yyyy HH:mm", {
                    locale: vi,
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Trạng thái
              </label>
              <div className="p-3 bg-muted rounded-md">
                {user.isDeleted ? (
                  <Badge
                    variant="destructive"
                    className="w-full justify-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" />
                    Đã xóa
                  </Badge>
                ) : (
                  <Badge
                    variant="default"
                    className="w-full justify-center bg-green-500"
                  >
                    Hoạt động
                  </Badge>
                )}
              </div>
            </div>

            {user.isDeleted && user.deletedAt && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Ngày xóa
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 p-3 bg-muted rounded-md">
                    {format(new Date(user.deletedAt), "dd/MM/yyyy HH:mm", {
                      locale: vi,
                    })}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}