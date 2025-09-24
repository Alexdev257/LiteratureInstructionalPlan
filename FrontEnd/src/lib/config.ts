import { z } from 'zod';
const configSchema = z.object({
    VITE_BASE_URL: z.string(),
    VITE_GOOGLE_CLIENT_ID: z.string(),
})

const configProject = configSchema.safeParse({
    VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
    VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})

if (!configProject.success) {
    console.error('Invalid configuration:', configProject.error);
    throw new Error('Invalid configuration');
}
export const envconfig = configProject.data;
export default envconfig;