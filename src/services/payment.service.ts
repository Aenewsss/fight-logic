class PaymentService {
    async getProducts() {
        return (await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stripe`, { method: "GET", cache: 'no-cache' })).json()
    }

    async getProductByPriceId(priceId: string) {
        return (await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/${priceId}`, { method: "GET", cache: 'no-cache' })).json()
    }

    async getPaymentSession(priceId: string, customer_email: string) {
        return (await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stripe`, { method: "POST", cache: 'no-cache', body: JSON.stringify({ priceId, customer_email }) })).json()
    }

    async expireSession(sessionId: string) {
        return (await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/${sessionId}`, { method: "POST", cache: 'no-cache' })).json()
    }

    async deleteProduct(priceId: string) {
        return (await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/${priceId}`, { method: "DELETE", cache: 'no-cache' })).json()
    }

    async updateProduct(priceId: string,form:FormData) {
        return (await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/${priceId}`, { method: "PUT", cache: 'no-cache',body: form })).json()
    }

    async createProduct(form:FormData) {
        return (await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/create-product`, { method: "POST", cache: 'no-cache',body: form })).json()
    }
}

const paymentService = new PaymentService()
export default paymentService