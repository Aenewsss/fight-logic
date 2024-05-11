type TColors = 'gray' | 'amber' | 'red' | 'green' | 'blue' | 'white' | 'black'

interface IProps {
    text: string
    onClick?: any
    backgroundColor?: TColors
    color?: TColors
    disabled?: boolean
    type?: "button" | "submit" | "reset" | undefined
    className?:string
}

export default function Button({ text, onClick, backgroundColor = 'amber', color = 'white', disabled, type = "button", className }: IProps) {
    
    return <button onClick={onClick} className={`px-4 py-1 rounded hover:scale-105 transition-all bg-${backgroundColor}-400 bg-${backgroundColor} text-${color} text-${color}-400 ${className}`} type={type} disabled={disabled}>{text}</button>
}