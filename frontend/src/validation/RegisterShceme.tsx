import * as z from "zod";
export const RegisterSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters").nonempty("Name is required"),
    email: z.email().nonempty(),
    password: z.string().min(6).max(20).nonempty(),
    confirmPassword: z.string().min(6).max(20).nonempty()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
export const LoginSchema = z.object({
    email: z.email().nonempty(),
    password: z.string().min(6).max(20).nonempty(),
});
export const ArticleSchema = z.object({
    title: z.string()
        .min(5, "Назва має містити мінімум 5 символів")
        .max(100, "Назва занадто довга")
        .nonempty("Заголовок обов'язковий"),
    content: z.string()
        .min(20, "Текст статті має бути не менше 20 символів")
        .nonempty("Текст статті обов'язковий"),
});

export type ArticleData = z.infer<typeof ArticleSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
export type LoginData = z.infer<typeof LoginSchema>;