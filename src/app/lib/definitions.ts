import { z } from 'zod'

export const SignupFormSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido' }).trim(),
  password: z
    .string()
    .min(6, { message: 'A senha precisa conter pelo menos 6 caracteres' })
    .trim(),
  confirmPassword: z
    .string()
    .min(6, { message: 'A senha precisa conter pelo menos 6 caracteres' })
    .trim(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if(confirmPassword != password) ctx.addIssue({
    code:"custom",
    message: "As senhas devem ser iguais"
  })
})

export type FormState =
  | {
    errors?: {
      email?: string[]
      password?: string[]
      confirmPassword?: string[]
    }
    message?: string
  }
  | undefined