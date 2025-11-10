import { templateApi } from "@/lib/api/template/template";
import type { TemplateInput } from "@/schema/templateSchema";
import { QUERY_KEY } from "@/utils/constants";
import type { ResponseData, Template, TemplateQuery } from "@/utils/type"
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
   const usePostTemplate = useMutation<ResponseData<Template>, Error, TemplateInput>({
      mutationFn: async (data: TemplateInput) => {
         return await templateApi.createTemplate(data);
      },
      onSuccess: async () => {
         const freshData = await templateApi.getTemplates();
         queryClient.setQueryData([QUERY_KEY.template({ PageNumber: 1, PageSize: 10, search: '' })], freshData);
      }
   });
   const useDeleteTemplate = useMutation<ResponseData<null>, Error, number>({
      mutationFn: async (id: number) => {
         return await templateApi.deleteTemplate(id);
      }
   });
   return { useGetTemplates, usePostTemplate, useDeleteTemplate, useGetTemplatesById };
};