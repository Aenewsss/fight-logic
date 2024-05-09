import Button from "@/components/button"
import { useFormStatus } from 'react-dom'

export function BannerButton() {
  const { pending } = useFormStatus()

  return <Button className="px-10 py-2" backgroundColor="amber" color="black" type='submit' disabled={pending} text={pending ? 'Carregando...' : 'Salvar'} />
}