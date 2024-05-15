export interface IResponse {
    error: string | null
    data: any | null
}

export interface IDiferentials {
    id?: string
    title: string
    description: string
}

export interface IFeedback {
    id?: string
    image: string
    text: string
    name: string
}

export interface ITeam {
    id?: string
    logo: string
    image: string
    text: string
    name: string
}

export interface ISchedule {
    monday: any
    tuesday: any,
    wednesday: any
    thursday: any,
    friday: any,
    saturday: any
    sunday: any,
}

export interface IAbout {
    text: string
    image: string
}

export interface IStripeProducts {
    name: string
    price: string
    monthly: number
    totalYear: number
    priceId: string
}