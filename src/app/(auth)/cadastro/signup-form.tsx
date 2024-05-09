'use client'

import { signup } from "@/app/actions/auth"
import { SignupButton } from "./signup-button"
import { useFormState } from "react-dom"

export function SignupForm() {
  const [state, action] = useFormState(signup, undefined)

  return (
    <form className="p-4 rounded bg-white flex flex-col gap-4 " action={action}>
      <div className="flex gap-2 flex-col min-w-[300px]">
        <label htmlFor="email">E-mail</label>
        <input required className="border border-gray-400 rounded px-2 py-1" id="email" name="email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div className="flex gap-2 flex-col min-w-[300px]">
        <label htmlFor="password">Senha</label>
        <input required className="border border-gray-400 rounded px-2 py-1" id="password" name="password" type="password"/>
      </div>
      <div className="flex gap-2 flex-col min-w-[300px]">
        <label htmlFor="confirm-password">Repetir Senha</label>
        <input required className="border border-gray-400 rounded px-2 py-1" id="confirm-password" name="confirm-password" type="password"/>
      </div>
      {state?.errors?.password && <p className="text-sm text-red-500">{state.errors.password}</p>}
      <SignupButton />
    </form>
  )
}