'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SearchFilter } from './SearchFilter';
import { TemplateTable } from './TemplateTable';
import { BasePagination } from '@/components/layout/base/pagination';
import { CreateTemplateDialog } from './CreateTemplateDialog';
import { useTemplate } from '@/hooks/useTemplate';
import { toast } from 'sonner';

interface Template {
  id: number;
  stt: number;
  title: string;
  price: number;
  gradeLevel: string;
  created_at: string;
  luongMua: number;
  status: 'active' | 'draft' | 'archived';
}

interface TemplateListSectionProps {
  templates: Template[];
}

export function TemplateListSection({ templates: initialTemplates }: TemplateListSectionProps) {
  const [templates, setTemplates] = useState(initialTemplates);
  const { deleteTemplate } = useTemplate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const itemsPerPage = 10;


  const handleView = (id: number) => {
    console.log('View template:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Edit template:', id);
  };

  const handleDelete = (id: number) => {
    deleteTemplate.mutate(id, {
      onSuccess: (res) => {
        setTemplates(prevTemplates => prevTemplates.filter(template => template.id !== id));
        toast.success(res.message);
      },
      onError: (error) => {
        toast.error(error.message || 'Xóa mẫu đề thất bại. Vui lòng thử lại!');
      }
    })
  };

  // Filter and pagination
  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.gradeLevel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTemplates = filteredTemplates.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách mẫu đề</CardTitle>
              <CardDescription>
                Quản lý và chỉnh sửa các mẫu đề thi của bạn
              </CardDescription>
            </div>
            <Button
              className="gap-2"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Thêm giáo án
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <TemplateTable
            templates={paginatedTemplates}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <BasePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredTemplates.length}
            itemsPerPage={itemsPerPage}
          />
        </CardContent>
      </Card>

      <CreateTemplateDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </>
  );
}