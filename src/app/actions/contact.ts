export async function contact(state: any, form: FormData) {
    return (await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/contact/contact-form`, {
        method: 'POST',
        body: form
    })).json()
}