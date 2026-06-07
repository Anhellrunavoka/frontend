import * as z from "zod";

const phoneRegex = /^\+380\d{9}$/;

export const ApplySchema = z.object({
  firstName: z
    .string()
    .min(2, "Мінімум 2 символи")
    .max(30, "Максимум 30 символів")
    .regex(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+$/, "Тільки літери"),
  lastName: z
    .string()
    .min(2, "Мінімум 2 символи")
    .max(30, "Максимум 30 символів")
    .regex(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+$/, "Тільки літери"),
  email: z.string().email("Некоректний email"),
  phone: z.string().regex(phoneRegex, "Формат: +380XXXXXXXXX (9 цифр після коду)"),
  birthDate: z.coerce.date().refine((date) => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    return age >= 16 && age <= 60;
  }, "Кандидат повинен бути від 16 до 60 років"),
  position: z.enum(["frontend", "backend", "fullstack", "design"], {
    errorMap: () => ({ message: "Оберіть позицію" }),
  }),
  experience: z.enum(["none", "less1", "1to3", "3plus"], {
    errorMap: () => ({ message: "Оберіть досвід роботи" }),
  }),
  skills: z
    .array(z.string())
    .min(1, "Оберіть від 1 до 4 технологій")
    .max(4, "Оберіть від 1 до 4 технологій"),
  salaryExpected: z.coerce
    .number()
    .min(5000, "Від 5 000 грн")
    .max(200000, "До 200 000 грн")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  startDate: z.coerce
    .date()
    .optional()
    .or(z.literal("").transform(() => undefined))
    .refine((date) => {
      if (!date) return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, "Дата не може бути в минулому"),
  portfolioUrl: z
    .string()
    .url("Некоректний URL")
    .optional()
    .or(z.literal("")),
  coverLetter: z
    .string()
    .optional()
    .refine((val) => !val || (val.length >= 50 && val.length <= 1000), {
      message: "Від 50 до 1000 символів",
    }),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "Згода з умовами обов'язкова" }),
  }),
});

export type ApplyData = z.infer<typeof ApplySchema>;