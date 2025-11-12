"use client";

import { useParams } from "@tanstack/react-router";
import { Mail, User, Calendar, Shield, Trash2 } from "lucide-react";
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

export default function ProfilePage() {
  const { id } = useParams({ from: "/userProfile/$id" });
  const { useGetUserById } = useUser();
  const { data: userProfile, isLoading, isError } = useGetUserById(Number(id));

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
      1: "Quản trị viên",
      2: "Giáo viên",
      3: "Học sinh",
    };
    return roles[roleId] || "Người dùng";
  };

  // Get role color
  const getRoleColor = (roleId: number) => {
    const colors: Record<number, "destructive" | "default" | "secondary"> = {
      1: "destructive",
      2: "default",
      3: "secondary",
    };
    return colors[roleId] || "secondary";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 p-3">
        <BaseHeader title="Hồ Sơ Người Dùng" description="Đang tải thông tin..." />
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
        <BaseHeader title="Hồ Sơ Người Dùng" description="Không tìm thấy thông tin" />
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
      <BaseHeader
        title="Hồ Sơ Người Dùng"
        description="Thông tin chi tiết về tài khoản"
      />

      {/* Profile Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`} />
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
                  {format(new Date(user.createdAt), "dd/MM/yyyy", { locale: vi })}
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
                <Badge variant={getRoleColor(user.roleId)} className="w-full justify-center">
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
                  <Badge variant="destructive" className="w-full justify-center gap-1">
                    <Trash2 className="h-3 w-3" />
                    Đã xóa
                  </Badge>
                ) : (
                  <Badge variant="default" className="w-full justify-center bg-green-500">
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