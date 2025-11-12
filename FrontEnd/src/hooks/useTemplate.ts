import { templateApi } from "@/lib/api/template/template";
import type { TemplateInput } from "@/schema/templateSchema";
import type { ResponseData, Template, PaginationResponse, TemplateQuery } from "@/utils/type"
import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "@/utils/constants"; 

export const useTemplate = () => {
    const useGetTemplates = (filters: TemplateQuery, options?: { enabled?: boolean }) => {
        // SỬA Ở ĐÂY: Bỏ dấu [] sau Template
        return useQuery<ResponseData<PaginationResponse<Template>>, Error>({
            queryKey: [QUERY_KEY.template(filters)],
            queryFn: () => templateApi.getTemplates(filters),
            staleTime: 5 * 60 * 1000, 
            enabled: options?.enabled ?? true,
        });
    };

    const createTemplate = useMutation<ResponseData<Template>, Error, TemplateInput>({
       mutationFn: async (data: TemplateInput) => {
          return await templateApi.createTemplate(data);
       }
    });
    const deleteTemplate = useMutation<ResponseData<null>, Error, number>({
       mutationFn: async (id: number) => {
          return await templateApi.deleteTemplate(id);
       }
    });
    
    return { useGetTemplates, createTemplate, deleteTemplate };
};