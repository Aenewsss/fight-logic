'use client'

import Button from "@/components/button"
import { useFormStatus } from 'react-dom'

export function SignupButton() {
  const { pending } = useFormStatus()

  return (
    <Button backgroundColor="amber" color="black" type='submit' disabled={pending} text={pending ? 'Carregando...' : 'Registrar'} />
  )
}