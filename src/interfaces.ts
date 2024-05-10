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

export interface ITeam {
    id?: string
    logo:string
    image: string
    text: string
    name: string
}