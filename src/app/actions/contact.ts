export async function contact(state: any, form: FormData) {
    return (await fetch('/api/contact', {
        method: 'POST',
        body: form
    })).json()
}