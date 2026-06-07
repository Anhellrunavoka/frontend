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
export type RegisterData = z.infer<typeof RegisterSchema>;