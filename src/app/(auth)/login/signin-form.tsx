'use client'

import { signin } from "@/app/actions/auth"
import { useFormState } from "react-dom"
import { SigninButton } from "./signin-button"

export function SigninForm() {
  const [state, action] = useFormState(signin, undefined)

  return (
    <form className="p-4 rounded bg-white flex flex-col gap-4 " action={action}>
      <div className="flex gap-2 flex-col min-w-[300px]">
        <label htmlFor="email">E-mail</label>
        <input required className="border border-gray-400 rounded px-2 py-1" id="email" name="email" />
      </div>

      <div className="flex gap-2 flex-col min-w-[300px]">
        <label htmlFor="password">Senha</label>
        <input required className="border border-gray-400 rounded px-2 py-1" id="password" name="password" type="password"/>
      </div>
      {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
      <SigninButton />
    </form>
  )
}