import { templateApi } from "@/lib/api/template/template";
import type { TemplateInput } from "@/schema/templateSchema";
import { QUERY_KEY } from "@/utils/constants";
import type { TemplateQuery } from "@/utils/type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"



export const useTemplate = () => {
   const queryClient = useQueryClient();
   const useGetTemplates = (filter: TemplateQuery) => {
      return useQuery({
         queryKey: [QUERY_KEY.template(filter)],
         queryFn: () => templateApi.getTemplates(filter),
         staleTime: 5 * 60 * 1000,
      });
   }
   const useGetTemplatesById = (id: number) => {
      return useQuery({
         queryKey: [QUERY_KEY.templateById(id)],
         queryFn: () => templateApi.getTemplateById(id),
         staleTime: 5 * 60 * 1000,
      })
   }
   const usePostTemplate = useMutation({
      mutationFn: async (data: TemplateInput) => {
         return await templateApi.createTemplate(data);
      },
      onSuccess: async () => {
         const freshData = await templateApi.getTemplates({ PageNumber: 1, PageSize: 10, Search: '' });
         queryClient.setQueryData([QUERY_KEY.template({ PageNumber: 1, PageSize: 10, Search: '' })], freshData);
      }
   });
   const usePutTemplate = useMutation({
      mutationFn: async ({ id, data }: { id: number; data: TemplateInput }) => {
         return await templateApi.updateTemplate(id, data);
      },
      onSuccess: async () => {
         const freshData = await templateApi.getTemplates({ PageNumber: 1, PageSize: 10, Search: '' });
         queryClient.setQueryData([QUERY_KEY.template({ PageNumber: 1, PageSize: 10, Search: '' })], freshData);
      }
   })
   const useDeleteTemplate = useMutation({
      mutationFn: async (id: number) => {
         return await templateApi.deleteTemplate(id);
      },
      onSuccess: async () => {
         const freshData = await templateApi.getTemplates({ PageNumber: 1, PageSize: 10, Search: '' });
         queryClient.setQueryData([QUERY_KEY.template({ PageNumber: 1, PageSize: 10, Search: '' })], freshData);
      }
   });
   const useRestoreTemplate = useMutation({
      mutationFn: async (id: number) => {
         return await templateApi.restoreTemplate(id);
      },
      onSuccess: async () => {
         const freshData = await templateApi.getTemplates({ PageNumber: 1, PageSize: 10, Search: '' });
         queryClient.setQueryData([QUERY_KEY.template({ PageNumber: 1, PageSize: 10, Search: '' })], freshData);
      }
   })
   return { useGetTemplates, usePostTemplate, useDeleteTemplate, useGetTemplatesById, usePutTemplate, useRestoreTemplate };
};