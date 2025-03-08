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
    url?: string
}

export interface ITeam {
    id?: string
    logo: string
    image: string
    text: string
    name: string
}

export interface ICourse {
    id?: string
    image: string
    text: string
    name: string
    link: string
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
    recurring?: string
}

export interface IStripeProductEdit {
    name: string
    image: string
    price: string
    recurring: string
    monthly: string
    priceId: string
}

export interface IPlan {
    id?: string
    text: string
    name: string
    price: string
    subscriptions: any[]
}

export enum RecurringEnum {
    yearly = 'anual',
    monthly = 'mensal',
    quarterly = 'trimestral',
    unique = 'unica',
}

export interface IRecurringData {
    type: RecurringEnum;
    installments: number;
    price: number;
}