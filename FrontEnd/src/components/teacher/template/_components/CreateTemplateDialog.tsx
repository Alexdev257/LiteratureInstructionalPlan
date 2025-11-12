'use client';

import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { templateSchema, type TemplateInput } from '@/schema/templateSchema';
import { useGradeLevel } from '@/hooks/useGradeLevel';
import { useTemplate } from '@/hooks/useTemplate';
import { toast } from 'sonner';
import { useSessionStore } from '@/stores/sessionStore';





interface CreateTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export function CreateTemplateDialog({
  open,
  onOpenChange,
}: CreateTemplateDialogProps) {
  const { useGetGradeLevels } = useGradeLevel();
  const { usePostTemplate } = useTemplate();
  const {user} = useSessionStore()
  const { data: gradeLevelData } = useGetGradeLevels({ PageNumber: 1, PageSize: 100 }, { enabled: open });
  const gradeLevels = gradeLevelData?.data.items || [];
  const form = useForm<TemplateInput>({
    resolver: zodResolver(templateSchema) as unknown as Resolver<TemplateInput>,
    defaultValues: {
      title: '',
      gradeLevelId: undefined,
      price: 0,
      createdById: Number(user?.UserId) ,
      file: undefined,
    },
  });

  const onSubmit = async (data: TemplateInput) => {
    try {
      usePostTemplate.mutate(data, {
        onSuccess: (res) => {
          if (res.isSuccess) {
            toast.success(res.message || 'Tạo giáo án thành công!');
            form.reset();
            onOpenChange(false);
          }

        },
        onError: (error) => {
          console.error('Error creating template:', error);
          toast.error(error.message || 'Tạo giáo án thất bại. Vui lòng thử lại!');
        }
      })
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm giáo án mới</DialogTitle>
          <DialogDescription>
            Điền thông tin để tạo giáo án mới cho học sinh
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tiêu đề <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập tiêu đề giáo án..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Grade Level */}
            <FormField
              control={form.control}
              name="gradeLevelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Lớp học <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn lớp học" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gradeLevels.map((level) => (
                        <SelectItem key={level.gradeLevelId} value={level.gradeLevelId.toString()}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Giá (VNĐ) <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nhập giá..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload */}
            <FormField
              control={form.control}
              name="file"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>File giáo án</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => onChange(e.target.files)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground">
                    Hỗ trợ: PDF, DOC, DOCX (Tối đa 10MB)
                  </p>
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="flex flex-col-reverse sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={usePostTemplate.isPending}
                  className="w-full sm:w-auto"
                >
                  Hủy
                </Button>
                <Button 
                  type="submit" 
                  disabled={usePostTemplate.isPending}
                  className="w-full sm:w-auto"
                >
                  {usePostTemplate.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Tạo giáo án
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}