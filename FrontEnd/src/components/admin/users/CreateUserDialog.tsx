// --- File: src/components/admin/users/CreateUserDialog.tsx ---
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, type Resolver } from "react-hook-form"; // Thêm 'type Resolver'
import { zodResolver } from "@hookform/resolvers/zod";
import { adminCreateUserSchema, type AdminCreateUserInput } from "@/schema/adminSchema";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roleId: number;
  roleName: string;
}

export function CreateUserDialog({ open, onOpenChange, roleId, roleName }: CreateUserDialogProps) {
  const { useCreateUser } = useAdminUsers();
  const createMutation = useCreateUser();

  const form = useForm<AdminCreateUserInput>({
    // --- SỬA LỖI REACT-HOOK-FORM ---
    resolver: zodResolver(adminCreateUserSchema) as unknown as Resolver<AdminCreateUserInput>,
    // -----------------------------
    defaultValues: {
      userName: "",
      fullName: "",
      email: "",
      password: "",
      roleId: roleId,
    },
  });

  useEffect(() => {
    // Reset form với đúng roleId khi dialog được mở
    if(open) {
      form.reset({
        userName: "",
        fullName: "",
        email: "",
        password: "",
        roleId: roleId 
      });
    }
  }, [open, roleId, form]);

  const onSubmit = (data: AdminCreateUserInput) => {
    createMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          onOpenChange(false);
          // form.reset() đã được xử lý trong useEffect
        }
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo tài khoản {roleName} mới</DialogTitle>
          <DialogDescription>
            Điền thông tin chi tiết để tạo tài khoản. Mật khẩu mặc định sẽ được tạo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên đăng nhập</FormLabel>
                  <FormControl>
                    <Input placeholder="nguyenvana" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="admin@example.com" {...field} />
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
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={createMutation.isPending}>
                Hủy
              </Button>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Tạo
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}