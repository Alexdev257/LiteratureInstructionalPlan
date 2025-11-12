// --- File: src/components/admin/users/UserPageContent.tsx ---
"use client";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BasePagination } from "@/components/layout/base/pagination";
import type { GetAllUserResponseDTO, GetAllUserQuery } from "@/utils/type";
import { Header } from "./Header";
import { UserToolbar } from "./UserToolbar";
import { RenderResults } from "./RenderResults";
import { CreateUserDialog } from "./CreateUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { useAdminUsers } from "@/hooks/useAdminUsers";
// [TODO: Tạo component EditUserDialog]
// import { EditUserDialog } from "./EditUserDialog"; 

// Type cho pagination
type PaginationData = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};

interface UserPageContentProps {
  users: GetAllUserResponseDTO[];
  isLoading: boolean;
  isError: boolean;
  filters: GetAllUserQuery;
  setFilters: Dispatch<SetStateAction<GetAllUserQuery>>;
  paginationData: PaginationData;
}

export default function UserPageContent({
  users,
  isLoading,
  isError,
  filters,
  setFilters,
  paginationData,
}: UserPageContentProps) {
  
  // --- State quản lý Dialog ---
  const [isCreateAdminOpen, setIsCreateAdminOpen] = useState(false);
  const [isCreateTeacherOpen, setIsCreateTeacherOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<GetAllUserResponseDTO | null>(null);
  const [userToDelete, setUserToDelete] = useState<GetAllUserResponseDTO | null>(null);
  
  // --- SỬA DÒNG NÀY: Đổi tên biến và setter ---
  const [userToRestore, setUserToRestore] = useState<GetAllUserResponseDTO | null>(null);
  // ------------------------------------------

  // --- Lấy hooks Mutations ---
  const { useDeleteUser, useRestoreUser } = useAdminUsers();
  const deleteMutation = useDeleteUser();
  const restoreMutation = useRestoreUser();
  // -------------------------

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, PageNumber: page }));
  };

  // --- Handlers ---
  const onTriggerDelete = (user: GetAllUserResponseDTO) => {
    setUserToDelete(user);
  };
  
  const onTriggerRestore = (user: GetAllUserResponseDTO) => {
     setUserToRestore(user); // <-- Sửa: Dùng setter mới
  };
  
  const onTriggerEdit = (user: GetAllUserResponseDTO) => {
    setUserToEdit(user);
    // [TODO: Mở dialog/trang edit]
    // alert(`Mở form edit cho: ${user.fullName}`);
  };
  // -------------------

  return (
    <>
      <div className="space-y-6">
        {/* ... (Header, Card, Toolbar, Results) ... */}
         <Header
          onCreateAdmin={() => setIsCreateAdminOpen(true)}
          onCreateTeacher={() => setIsCreateTeacherOpen(true)}
        />
        <Card>
          <CardHeader>
            <UserToolbar
              filters={filters}
              setFilters={setFilters}
            />
          </CardHeader>
          <CardContent>
            <RenderResults
              users={users}
              isLoading={isLoading}
              isError={isError}
              onEdit={onTriggerEdit}
              onDelete={onTriggerDelete}
              onRestore={onTriggerRestore}
            />
            
            {paginationData && paginationData.totalPages > 1 && !isLoading && (
              <div className="mt-4">
                <BasePagination
                  currentPage={paginationData.currentPage}
                  totalPages={paginationData.totalPages}
                  onPageChange={handlePageChange}
                  totalItems={paginationData.totalItems}
                  itemsPerPage={paginationData.itemsPerPage}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* --- Dialogs (Modals) --- */}
      <CreateUserDialog
        open={isCreateAdminOpen}
        onOpenChange={setIsCreateAdminOpen}
        roleId={1} // 1 = Admin
        roleName="Admin"
      />
      <CreateUserDialog
        open={isCreateTeacherOpen}
        onOpenChange={setIsCreateTeacherOpen}
        roleId={2} // 2 = Teacher
        roleName="Giáo viên"
      />
      
      {/* [TODO: Tạo và gọi EditUserDialog] */}
      
      <DeleteUserDialog
        user={userToDelete}
        open={!!userToDelete}
        onOpenChange={(open) => !open && setUserToDelete(null)}
        onConfirm={() => {
          if (userToDelete) {
            deleteMutation.mutate(userToDelete.userId, {
              onSettled: () => setUserToDelete(null)
            });
          }
        }}
        isPending={deleteMutation.isPending}
      />
      
      {/* --- SỬA CÁC DÒNG NÀY --- */}
      <DeleteUserDialog
        user={userToRestore} 
        open={!!userToRestore}
        onOpenChange={(open) => !open && setUserToRestore(null)} // Sửa thành setUserToRestore
        onConfirm={() => {
          if (userToRestore) {
            restoreMutation.mutate(userToRestore.userId, {
              onSettled: () => setUserToRestore(null) // Sửa thành setUserToRestore
            });
          }
        }}
        isPending={restoreMutation.isPending}
        isRestore={true}
      />
      {/* ------------------------- */}
    </>
  );
}