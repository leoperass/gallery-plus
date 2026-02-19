import { z } from 'zod';

// Schema para o formulário de nova foto

export const photoNewFormSchema = z.object({
    title: z.string().min(1, { message: "Campo obrigatório" }).max(255),
    file: z.instanceof(FileList).refine(file => file.length > 0, {
        message: "Campo obrigatório"
    }),
    albumsIds: z.array(z.string().uuid()).optional()
});

export type PhotoNewFormSchema = z.infer<typeof photoNewFormSchema>