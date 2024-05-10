export interface IResponse {
    error: string | null
    data: any | null
}

export interface IDiferentials {
    id: string
    title: string
    description: string
}

export interface IFeedback {
    id?: string
    image: string
    text: string
    name: string
}