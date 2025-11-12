import { templateApi } from "@/lib/api/template/template";
import type { TemplateInput } from "@/schema/templateSchema";
import type { ResponseData, Template } from "@/utils/type"
import { useMutation } from "@tanstack/react-query"



export const useTemplate = () => {
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
    return { createTemplate, deleteTemplate };
};